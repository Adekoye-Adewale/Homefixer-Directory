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
        }
        return (
                <Form {...form}>
                        <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6 max-w-lg mx-auto"
                        >
                                {/* Type of Enquiry */}
                                <FormField
                                        control={form.control}
                                        name="enquiryType"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Type of Enquiry</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                        <SelectTrigger>
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

                                {/* First Name */}
                                <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>
                                                                First Name
                                                        </FormLabel>
                                                        <FormControl>
                                                                <Input 
                                                                        placeholder="John" 
                                                                        {...field}
                                                                />
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
                                                        <FormLabel>
                                                                Last Name
                                                        </FormLabel>
                                                        <FormControl>
                                                                <Input 
                                                                        placeholder="Doe" 
                                                                        {...field} 
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Email */}
                                <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>E-mail</FormLabel>
                                                        <FormControl>
                                                                <Input 
                                                                        placeholder="sample@email.com" 
                                                                        {...field} 
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Phone (optional) */}
                                <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Phone (optional)</FormLabel>
                                                        <FormControl>
                                                                <Input 
                                                                        placeholder="08012345678" 
                                                                        {...field} 
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Message */}
                                <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Message</FormLabel>
                                                        <FormControl>
                                                                <Textarea
                                                                        placeholder="Type your message here..."
                                                                        rows={8}
                                                                        {...field}
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Submit Button */}
                                <Button type="submit" className="w-full">
                                        Submit Enquiry
                                </Button>
                        </form>
                </Form>
        )
}
