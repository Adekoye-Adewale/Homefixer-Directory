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
import { Button } from "@/components/ui/button"

const formSchema = z.object({
                firstName: z.string().min(1, "First name is required"),
                lastName: z.string().min(1, "Last name is required"),
                businessEmail: z
                        .string()
                        .email("Enter a valid business email")
                        .refine(
                                (val) =>
                                        !val.endsWith("@gmail.com") && !val.endsWith("@aol.com"),
                                { message: "Please use a business email (not Gmail or AOL)" }
                        ),
                businessName: z.string().min(1, "Business name is required"),
                businessAddress: z.string().optional(),
                businessWebsite: z.string().optional(),
                businessPhone: z
                        .string()
                        .min(11, "Enter a valid phone number")
                        .regex(/^0\d{10}$/, "Phone number must be 11 digits starting with 0"),
                businessType: z.string().min(1, "Select a business type/industry"),
                partnershipType: z.string().min(1, "Select how you’d like to partner"),
                otherPartnership: z.string().optional(),
        })
        .refine(
                (data) =>
                        data.partnershipType !== "other" || !!data.otherPartnership?.trim(),
                {
                        message: "Please describe your partnership idea",
                        path: ["otherPartnership"],
                }
        )

type PartnerFormData = z.infer<typeof formSchema>

export default function PartnerWithUsForm() { 

        const form = useForm<PartnerFormData>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                        firstName: "",
                        lastName: "",
                        businessEmail: "",
                        businessName: "",
                        businessAddress: "",
                        businessWebsite: "",
                        businessPhone: "",
                        businessType: "",
                        partnershipType: "",
                        otherPartnership: "",
                },
        })

        const selectedPartnership = form.watch("partnershipType")

        const onSubmit = (values: PartnerFormData) => {
                console.log("Form data:", values)
        }

        const businessTypes = [
                "Construction & Renovation",
                "Interior Design",
                "Plumbing",
                "Electrical Services",
                "Cleaning Services",
                "Landscaping",
                "Home Automation",
                "Pest Control",
                "Real Estate & Property Management",
                "Furniture & Home Decor",
                "Painting",
                "Security Systems",
                "Other",
        ]

        return (
                <Form {...form}>
                        <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                        >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                </div>

                                <FormField
                                        control={form.control}
                                        name="businessEmail"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Business Email</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="mail@business.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <FormField
                                        control={form.control}
                                        name="businessName"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Business Name</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="Business LLC" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <FormField
                                        control={form.control}
                                        name="businessAddress"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Business Address</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="123 Broad Way Street, Lagos" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <FormField
                                        control={form.control}
                                        name="businessWebsite"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Business Website</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="business.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <FormField
                                        control={form.control}
                                        name="businessPhone"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Business Phone Number</FormLabel>
                                                        <FormControl>
                                                                <Input placeholder="09012345678" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <FormField
                                        control={form.control}
                                        name="businessType"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Business Type / Industry</FormLabel>
                                                        <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                        >
                                                                <FormControl>
                                                                        <SelectTrigger>
                                                                                <SelectValue placeholder="Select industry" />
                                                                        </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                        {businessTypes.map((type) => (
                                                                                <SelectItem key={type} value={type}>
                                                                                        {type}
                                                                                </SelectItem>
                                                                        ))}
                                                                </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <FormField
                                        control={form.control}
                                        name="partnershipType"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>How would you like to partner with us?</FormLabel>
                                                        <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                        >
                                                                <FormControl>
                                                                        <SelectTrigger>
                                                                                <SelectValue placeholder="Select partnership type" />
                                                                        </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                        <SelectItem value="advertise">Advertise with us</SelectItem>
                                                                        <SelectItem value="collaborate">
                                                                                Brand collaborations
                                                                        </SelectItem>
                                                                        <SelectItem value="sponsor">
                                                                                We sponsor your event
                                                                        </SelectItem>
                                                                        <SelectItem value="other">Other</SelectItem>
                                                                </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {selectedPartnership === "other" && (
                                        <FormField
                                                control={form.control}
                                                name="otherPartnership"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Describe your partnership idea</FormLabel>
                                                                <FormControl>
                                                                        <Input
                                                                                placeholder="Tell us how you'd like to partner"
                                                                                {...field}
                                                                        />
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                )}

                                <Button type="submit" className="w-full">
                                        Submit Partnership Request
                                </Button>
                        </form>
                </Form>
        ) 
}