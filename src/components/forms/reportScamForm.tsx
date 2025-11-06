"use client"

import React from "react"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

// Schema validation
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
                console.log(values)
        }

        return (
                <Form {...form}>
                        <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6 max-w-xl mx-auto"
                        >
                                {/* First Name */}
                                <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>First Name</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="John" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Last Name */}
                                <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Last Name</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Phone */}
                                <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Your Phone Number</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="09012345678" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Business Name */}
                                <FormField
                                        control={form.control}
                                        name="businessName"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Business Name You Are Reporting</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="Business LLC" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
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
                                                                        className="min-h-[120px]"
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
                                                <FormItem className="flex items-start space-x-2">
                                                        <FormControl>
                                                                <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
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

                                <Button 
                                        type="submit" 
                                        className="w-full"
                                >
                                        Submit Report
                                </Button>
                        </form>
                </Form>
        )
}