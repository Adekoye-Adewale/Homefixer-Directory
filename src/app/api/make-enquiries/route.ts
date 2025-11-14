import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/supabase/client";
import redisRateLimit from "@/lib/rate-limit-redis";
import { GoogleAuth } from "google-auth-library"
import { Resend } from "resend";
import { ADMIN_EMAIL } from "@/contents/constants";

const PROJECT_ID = process.env.GOOGLE_PROJECT_ID!

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
        enquiryType: z.enum(["General", "Technical"]),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().min(5),
        recaptchaToken: z.string().optional()
});

export async function POST(req: NextRequest) {
        try {
                const body = await req.json();
                const { recaptchaToken, ...formData } = body

                if (!recaptchaToken) {
                        return NextResponse.json(
                                { error: "Missing reCAPTCHA token" },
                                { status: 400 }
                        )
                }

                // Create a credentialed client for Google APIs
                const auth = new GoogleAuth({
                        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS!),
                        scopes: ["https://www.googleapis.com/auth/cloud-platform"],
                })
                const client = await auth.getClient()

                // Build request body for reCAPTCHA Enterprise assessment
                const assessment = {
                        event: {
                                token: recaptchaToken,
                                siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                        },
                }

                const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments`

                const response = await client.request<{
                        riskAnalysis?: {
                                score?: number;
                                reasons?: string[];
                        };
                }>({
                        url,
                        method: "POST",
                        data: assessment,
                })

                const riskAnalysis = response.data?.riskAnalysis
                const score = riskAnalysis?.score ?? 0
                const reasons = riskAnalysis?.reasons ?? []

                // console.log("reCAPTCHA Score:", score, "Reasons:", reasons)

                // Enforce threshold
                if (score < 0.7) {
                        return NextResponse.json(
                                { 
                                        error: `Suspicious activity detected. Try again later. Reason: ${reasons}` 
                                },
                                { 
                                        status: 403 
                                }
                        )
                }

                const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

                // 1. validate
                const parsed = schema.safeParse(formData);
                if (!parsed.success) {
                        return NextResponse.json(
                                { 
                                        error: "Invalid input", 
                                        details: parsed.error.format() 
                                }, 
                                { status: 400 });
                }

                // 2. rate limit
                const rl = await redisRateLimit(ip, 10, 60);

                if (!rl.ok) {
                        return NextResponse.json(
                                { error: "Too many requests" }, 
                                { status: 429 });
                }

                // 3. insert into supabase (server role)
                const insertPayload = {
                        enquiry_type: parsed.data.enquiryType,
                        first_name: parsed.data.firstName,
                        last_name: parsed.data.lastName,
                        email: parsed.data.email,
                        phone: parsed.data.phone ?? null,
                        message: parsed.data.message,
                        ip_address: ip
                };

                const { error } = await supabase.from("makeenquiriesform").insert([insertPayload]);
                if (error) {
                        console.error("Supabase insert error:", error);
                        return NextResponse.json({ error: "Database error" }, { status: 500 });
                }

                // Send confirmation to user
                try {
                        const userEmail = await resend.emails.send({
                                from: "Lagos Home Fixers <noreply@lagoshomefixers.adekoye.com.ng>", 
                                to: formData.email,
                                subject: "We’ve Received Your Enquiry",
                                html: `
                                <h2>Hi ${formData.firstName},</h2>
                                <p>Thank you for contacting Lagos Home Fixers. We’ve received your enquiry and will get back to you shortly.</p>
                                <p><strong>Summary:</strong></p>
                                <ul>
                                <li>Type: ${formData.enquiryType}</li>
                                <li>Message: ${formData.message}</li>
                                </ul>
                                <p>Kind regards,<br/>The Lagos Home Fixers Team</p>
                        `,
                        });
                if (userEmail.error) {
                        console.error(
                                "Resend user email error:", 
                                userEmail.error
                        );
                        return NextResponse.json(
                                { error: "Invalid email address" }, 
                                { status: 400 }
                        );
                }
                } catch (mailError: unknown) {
                        if (mailError instanceof Error) {
                                console.error(
                                        "Failed to send user confirmation email:",
                                        mailError.message
                                );
                        } else {
                                console.error(
                                        "Unknown email sending error:", 
                                        mailError
                                );
                        }
                        return NextResponse.json(
                                { error: "Invalid email address" }, 
                                { status: 400 }
                        );
                }

                // Send notification to admin
                await resend.emails.send({
                        from: "Lagos Home Fixers <noreply@lagoshomefixers.adekoye.com.ng>",
                to: ADMIN_EMAIL,
                        subject: `New Enquiry from ${formData.firstName} ${formData.lastName}`,
                html: `
                <h3>New enquiry received:</h3>
                <p><strong>Type:</strong> ${formData.enquiryType}</p>
                <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone || "N/A"}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message}</p>
                `,
                });

                return NextResponse.json({ ok: true }, { status: 201 });
        } catch (err) {
                console.error("Enquiries POST error:", err);
                return NextResponse.json(
                        { error: "Internal server error" }, 
                        { status: 500 }
                );
        }
}
