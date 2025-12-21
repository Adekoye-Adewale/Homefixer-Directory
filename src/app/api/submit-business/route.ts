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
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.email(),
        businessName: z.string().min(1),
        businessEmail: z.email(),
        businessPhone: z.string().min(10).max(11),
        businessAddress: z.string().min(1),
        businessLocation: z.string().min(1),
        businessCategory: z.string().min(1),
        businessDescription: z.string().min(10),
        businessWebsite: z.url(),
});

function extractFormFields(body: FormData) {
        return {
                firstName: body.get("firstName") as string,
                lastName: body.get("lastName") as string,
                email: body.get("email") as string,
                businessName: body.get("businessName") as string,
                businessEmail: body.get("businessEmail") as string,
                businessPhone: body.get("businessPhone") as string,
                businessAddress: body.get("businessAddress") as string,
                businessLocation: body.get("businessLocation") as string,
                businessCategory: body.get("businessCategory") as string,
                businessDescription: body.get("businessDescription") as string,
                businessWebsite: body.get("businessWebsite") as string,
        };
}

export async function POST(req: NextRequest) {
        try {
                const body = await req.formData();
                const businessLogo = body.get("businessLogo") as File;
                const businessCoverImage = body.get("businessCoverImage") as File;

                const recaptchaToken = body.get("recaptchaToken") as string;
                
                const formData = extractFormFields(body);
                
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

                 // validate data
                const parsed = schema.safeParse(formData);
                if (!parsed.success) {
                        return NextResponse.json(
                                { 
                                        error: "Invalid input", 
                                        details: parsed.error.format() 
                                }, 
                                { status: 400 });
                }

                // rate limit
                const rl = await redisRateLimit(ip, 10, 60);

                if (!rl.ok) {
                        return NextResponse.json(
                                { error: "Too many requests" }, 
                                { status: 429 });
                }
                
                const businessName = body.get("businessName") as string;
                // Upload logo
                const logoFile = businessLogo;
                const logoPath = `logos/${businessName}-logo-${crypto.randomUUID()}`;
                const { error: logoErr } = await supabase.storage
                        .from("business-logos")
                        .upload(logoPath, logoFile, {
                                contentType: logoFile.type,
                        });

                if (logoErr) {
                        return NextResponse.json({ error: "Failed to upload logo" }, { status: 500 });
                }

                const { data: logoUrl } = supabase.storage
                        .from("business-logos")
                        .getPublicUrl(logoPath);

                // Upload cover image
                const coverFile = businessCoverImage;
                const coverPath = `covers/${businessName}-cover-image-${crypto.randomUUID()}`;
                const { error: coverErr } = await supabase.storage
                        .from("business-cover-images")
                        .upload(coverPath, coverFile, {
                                contentType: coverFile.type,
                        });

                if (coverErr) {
                        return NextResponse.json(
                                { error: "Failed to upload cover image" }, 
                                { status: 500 }
                        );
                }

                const { data: coverUrl } = supabase.storage
                        .from("business-cover-images")
                        .getPublicUrl(coverPath);

                // Insert into DB
                const insertPayload = {
                        first_name: parsed.data.firstName,
                        last_name: parsed.data.lastName,
                        email: parsed.data.email,
                        business_name: parsed.data.businessName,
                        business_email: parsed.data.businessEmail,
                        business_phone: parsed.data.businessPhone,
                        business_address: parsed.data.businessAddress,
                        business_location: parsed.data.businessLocation,
                        business_category: parsed.data.businessCategory,
                        business_description: parsed.data.businessDescription,
                        business_website: parsed.data.businessWebsite,
                        business_logo_url: logoUrl.publicUrl,
                        business_cover_image_url: coverUrl.publicUrl,
                        ip_address: ip
                }
                const { error } = await supabase
                        .from("business_submissions")
                        .insert( insertPayload );

                if (error) {
                        return NextResponse.json(
                                { error: error.message }, 
                                { status: 500 }
                        );
                }

                // Send User submission confrmation via email
                await resend.emails.send({
                        from: "Lagos Home Fixers <info@lagoshomefixers.adekoye.com.ng>",
                        to: formData.email,
                        subject: "We Have Received Your Business Submission",
                        html: `
                        <h2>Hi ${formData.firstName} ${formData.lastName},</h2>
                        <p>Thank you for submitting your business to Lagos Home Fixers. We are happy to welcome you to the Lagos Home Fixers community. Once your listing is verified, your business will be posted, and we will notify you.</p>
                        <p><strong>Summary:</strong></p>
                        <ul>
                        <li>Business Logo: <img src='${logoUrl.publicUrl}' alt='business logo' width='100px' height='100px'/></li>
                        <li>Business Cover Image:<img src='${coverUrl.publicUrl}' alt='business cover image' width='320px' height='120px'/> </li>
                        <li>Business Name: ${formData.businessName}</li>
                        <li>Business Email Address: ${formData.businessEmail}</li>
                        <li>Business Phone Number: ${formData.businessPhone}</li>
                        <li>Business Address: ${formData.businessAddress}</li>
                        <li>Business Location: ${formData.businessLocation}</li>
                        <li>Business Category: ${formData.businessCategory}</li>
                        <li>Business Description: ${formData.businessDescription}</li>
                        <li>Business Website: ${formData.businessWebsite}</li>
                        </ul>
                        <p>Kind regards,<br/>The Lagos Home Fixers Team</p>
                `,
                });

                 // Send notification to admin
                await resend.emails.send({
                        from: "Lagos Home Fixers <noreply@lagoshomefixers.adekoye.com.ng>",
                        to: ADMIN_EMAIL,
                                subject: `New Business Submission from ${formData.firstName} ${formData.lastName}`,
                        html: `
                        <h3>A new business has been submitted</h3>
                        <p><strong>Business Name:</strong> ${formData.businessName}</p>
                        <p><strong>Business Email:</strong> ${formData.businessEmail}</p>
                        <p><strong>Phone:</strong> ${formData.businessPhone}</p>
                        <p><strong>Address:</strong> ${formData.businessAddress}</p>
                        <p><strong>Location:</strong> ${formData.businessLocation}</p>
                        <p><strong>Category:</strong> ${formData.businessCategory}</p>
                        <p><strong>Website:</strong> ${formData.businessWebsite}</p>
                        `,
                });

                return NextResponse.json(
                        { success: true }, 
                        { status: 200 }
                );

        } catch (err) {
                console.error("Enquiries POST error:", err);
                return NextResponse.json(
                        { error: "Internal server error" },
                        { status: 500 }
                );
        }
}