"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
        Form,
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import SubmitButton from "./submitButton"
import FormInput from "./formInput"
import { AgreeTerms } from "./submitBusinessForm"
import { toast } from "sonner"
import FormConfirmation from "../layouts/formConfirmation"

const formSchema = z.object({
        firstName: z.string().min(2, "First name is required"),
        lastName: z.string().min(2, "Last name is required"),
        phone: z.string()
                .min(10, "Enter a valid phone number")
                .regex(/^0\d{10}$/, "Phone number must start with 0 and be 11 digits"),
        businessName: z.string().min(1, "Business name is required"),
        reason: z.string().min(1, "Please explain why you are reporting this business"),
        consent: z.boolean().refine((val) => val === true, {
                message: "You must agree before submitting",
        }),
})

export default function ReportScamForm() {

        const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle")

        const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                        firstName: "",
                        lastName: "",
                        phone: "",
                        businessName: "",
                        reason: "",
                        consent: false,
                },
        })

        function onSubmit(values: z.infer<typeof formSchema>) {
                setStatus("submitting")
                console.log(values)
                toast.success("Business submitted successfully!")
                form.reset()
        }

        if (status === "submitted") {
                return (
                        <FormConfirmation 
                                title="Report Sent!"
                        />
                )
        }

        return (
                <Form {...form}>
                        <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6 max-w-xl mx-auto"
                        >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* First Name */}
                                        <FormInput
                                                control={form.control}
                                                name="firstName"
                                                label="First Name"
                                                placeholder="John"
                                        />

                                        {/* Last Name */}
                                        <FormInput
                                                control={form.control}
                                                name="lastName"
                                                label="Last Name"
                                                placeholder="Doe"
                                        />
                                </div>

                                {/* Phone */}
                                <FormInput
                                        control={form.control}
                                        name="phone"
                                        label="Your Phone Number"
                                        placeholder="09012345678"
                                />

                                {/* Business Name */}
                                <FormInput
                                        control={form.control}
                                        name="businessName"
                                        label="Business Name You Are Reporting"
                                        placeholder="Business LLC"
                                />

                                {/* Reason */}
                                <FormField
                                        control={form.control}
                                        name="reason"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Why You Are Reporting This Business</FormLabel>
                                                        <FormControl>
                                                                <Textarea
                                                                        placeholder="Describe your reason for reporting the business here..."
                                                                        className="rounded-[4px] border-2 placeholder:text-xs text-xs focus-visible:ring-[0px] min-h-32"
                                                                        {...field}
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Consent Checkbox */}
                                <FormField
                                        control={form.control}
                                        name="consent"
                                        render={({ field }) => (
                                                <FormItem className="flex items-center space-x-2 cursor-pointer">
                                                        <FormControl>
                                                                <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        className="border-black rounded-[4px]"
                                                                />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                                <FormLabel className="font-normal">
                                                                        I agree that you can contact me during this investigation.
                                                                </FormLabel>
                                                                <FormMessage />
                                                        </div>
                                                </FormItem>
                                        )}
                                />

                                <SubmitButton 
                                        status={status}
                                        label='Submit Report'
                                />

                                <AgreeTerms/>
                        </form>
                </Form>
        )
}