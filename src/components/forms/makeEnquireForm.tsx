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
import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import FormInput from "./formInput"
import SubmitButton from "./submitButton"

const enquirySchema = z.object({
        enquiryType: z.enum(["General", "Technical"] as const, "Please select the type of enquiry."),
        firstName: z.string().min(1, "First name is required."),
        lastName: z.string().min(1, "Last name is required."),
        email: z.string().email("Please enter a valid email."),
        phone: z.string().optional(),
        message: z.string().min(5, "Message must be at least 5 characters long."),
})

type EnquiryFormValues = z.infer<typeof enquirySchema>

export default function MakeEnquireForm() {

        const form = useForm < EnquiryFormValues > ({
                resolver: zodResolver(enquirySchema),
                defaultValues: {
                        enquiryType: "General",
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        message: "",
                },
        })

        function onSubmit(values: EnquiryFormValues) {
                console.log(values)
                toast.success("Enquiry submitted successfully!")
                form.reset()
        }
        return (
                <Form {...form}>
                        <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6 w-full"
                        >
                                {/* Type of Enquiry */}
                                <FormField
                                        control={form.control}
                                        name="enquiryType"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>
                                                                Type of Enquiry
                                                        </FormLabel>
                                                        <Select 
                                                                onValueChange={field.onChange} 
                                                                defaultValue={field.value}>
                                                                <FormControl>
                                                                        <SelectTrigger className="text-xs w-full rounded-[4px] border-2 placeholder:text-xs focus-visible:ring-[0px]">
                                                                                <SelectValue placeholder="Select type" />
                                                                        </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                        <SelectItem value="General">General</SelectItem>
                                                                        <SelectItem value="Technical">Technical</SelectItem>
                                                                </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* First Name */}
                                        <FormInput
                                                control={form.control}
                                                name="firstName"
                                                label="First Name"
                                                placeholder="John"
                                        />

                                        {/* last Name */}
                                        <FormInput
                                                control={form.control}
                                                name="lastName"
                                                label="Last Name"
                                                placeholder="Doe"
                                        />
                                </div>

                                {/* Email */}
                                <FormInput
                                        control={form.control}
                                        name="email"
                                        label="E-mail"
                                        placeholder="sample@email.com"
                                />

                                {/* Phone (optional) */}
                                <FormInput
                                        control={form.control}
                                        name="phone"
                                        label="Phone number (optional)"
                                        placeholder="08012345678"
                                />

                                {/* Message */}
                                <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>
                                                                Message
                                                        </FormLabel>
                                                        <FormControl>
                                                                <Textarea
                                                                        className="rounded-[4px] border-2 placeholder:text-xs text-xs focus-visible:ring-[0px] min-h-32"
                                                                        placeholder="Type your message here..."
                                                                        rows={8}
                                                                        {...field}
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <SubmitButton label="Submit Enquiry"/>
                        </form>
                </Form>
        )
}
