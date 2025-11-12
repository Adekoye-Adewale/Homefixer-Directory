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
import FormInput from "./formInput"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import SubmitButton from "./submitButton"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import Link from "next/link"
import FormConfirmation from "../layouts/formConfirmation"

const formSchema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email"),
        businessName: z.string().min(1, "Legal business name is required"),
        businessEmail: z.string().email("Invalid business email"),
        businessPhone: z.string().min(10, "Phone number is required"),
        businessAddress: z.string().min(1, "Business address is required"),
        businessLocation: z.string().min(5, "Select a location"),
        businessCategory: z.string().min(1, "Select a category"),
        businessDescription: z.string().min(1, "Business description is required"),
        businessWebsite: z.string().url("Enter a valid website URL e.g https://domain.com"),
        businessLogo: z
                .any()
                .refine(file => file?.[0], "Logo is required")
                .refine(file => file?.[0]?.size <= 5 * 1024 * 1024, "Max size is 5MB")
                .refine(
                        file => ["image/png", "image/jpeg", "image/jpg"].includes(file?.[0]?.type),
                        "Only PNG, JPEG, or JPG allowed"
                ),
        businessCover: z
                .any()
                .refine(file => file?.[0], "Cover image is required")
                .refine(file => file?.[0]?.size <= 10 * 1024 * 1024, "Max size is 10MB")
                .refine(
                        file => ["image/png", "image/jpeg", "image/jpg"].includes(file?.[0]?.type),
                        "Only PNG, JPEG, or JPG allowed"
                ),
        authorisation: z.boolean().refine(val => val === true, "You must confirm authorisation"),
})

export default function SubmitBusinessForm() {

        const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle")

        const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        businessName: "",
                        businessEmail: "",
                        businessPhone: "",
                        businessAddress: "",
                        businessLocation: "",
                        businessCategory: "",
                        businessDescription: "",
                        businessWebsite: "",
                        authorisation: false,
                },
        })

        const onSubmit = (values: z.infer<typeof formSchema>) => {
                setStatus("submitting")
                console.log(values)
                toast.success("Business submitted successfully!")
                form.reset()
        }

        const locations = [
                { value: "abule-egba", title: "Abule Egba" },
                { value: "agege", title: "Agege" },
                { value: "ajah", title: "Ajah" },
                { value: "ajegunle", title: "Ajegunle" },
                { value: "alimosho", title: "Alimosho" },
                { value: "amuwo-odofin", title: "Amuwo-Odofin" },
                { value: "apapa", title: "Apapa" },
                { value: "banana-island", title: "Banana Island" },
                { value: "bariga", title: "Bariga" },
                { value: "chevron", title: "Chevron" },
                { value: "cms", title: "CMS" },
                { value: "eko-atlantic", title: "Eko Atlantic" },
                { value: "ebute-metta", title: "Ebute Metta" },
                { value: "egbeda", title: "Egbeda" },
                { value: "festac-town", title: "Festac Town" },
                { value: "gbagada", title: "Gbagada" },
                { value: "ibeju-lekki", title: "Ibeju Lekki" },
                { value: "ikeja", title: "Ikeja" },
                { value: "ikoyi", title: "Ikoyi" },
                { value: "ikorodu", title: "Ikorodu" },
                { value: "ikotun", title: "Ikotun" },
                { value: "isale-eko", title: "Isale Eko" },
                { value: "ketu", title: "Ketu" },
                { value: "lekki-phase-1", title: "Lekki Phase 1" },
                { value: "maryland", title: "Maryland" },
                { value: "mushin", title: "Mushin" },
                { value: "ojota", title: "Ojota" },
                { value: "ojo", title: "Ojo" },
                { value: "oshodi", title: "Oshodi" },
                { value: "oworonshoki", title: "Oworonshoki" },
                { value: "shomolu", title: "Shomolu" },
                { value: "surulere", title: "Surulere" },
                { value: "victoria-island", title: "Victoria Island" },
                { value: "yaba", title: "Yaba" },
        ]

        const categories = [
                "Air conditioning services",
                "Cleaners",
                "P.O.P makers",
                "Tailers",
                "Interior decors",
                "Carpenters",
                "Security provider and installation services",
                "Electricians",
                "Plumbers",
                "Landscaping services",
                "Painters",
        ]

        if (status === "submitted") {
                return (
                        <FormConfirmation 
                                title="Business Submitted!"
                        />
                )
        }

        return (
                <Form {...form}>
                        <form 
                                onSubmit={form.handleSubmit(onSubmit)} 
                                className="space-y-5"
                        >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput
                                                control={form.control}
                                                name="firstName"
                                                label="First Name"
                                                placeholder="John"
                                        />

                                        <FormInput
                                                control={form.control}
                                                name="lastName"
                                                label="Last Name"
                                                placeholder="Doe"
                                        />
                                </div>

                                <FormInput
                                        control={form.control}
                                        name="email"
                                        label="Your Email"
                                        placeholder="person@email.com"
                                />

                                <FormInput
                                        control={form.control}
                                        name="businessName"
                                        label="Legal Business Name"
                                        placeholder="Mak and Sons PLC"
                                />

                                <FormInput
                                        control={form.control}
                                        name="businessEmail"
                                        label="Business Email"
                                        placeholder="info@sample.org"
                                />

                                <FormInput
                                        control={form.control}
                                        name="businessPhone"
                                        label="Business Phone Number"
                                        placeholder="09012345678"
                                />

                                <FormInput
                                        control={form.control}
                                        name="businessAddress"
                                        label="Business Address"
                                        placeholder="123 sample road, Ojota, Lagos"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                                control={form.control}
                                                name="businessLocation"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>
                                                                        Business Location
                                                                </FormLabel>
                                                                <Select onValueChange={field.onChange}>
                                                                        <FormControl>
                                                                                <SelectTrigger className="text-xs w-full rounded-[4px] border-2 placeholder:text-xs focus-visible:ring-[0px]">
                                                                                        <SelectValue
                                                                                                placeholder="Select location"
                                                                                        />
                                                                                </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                                {locations.map(loc => (
                                                                                        <SelectItem key={loc.value} value={loc.value}>
                                                                                                {loc.title}
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
                                                name="businessCategory"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>
                                                                        Business Category
                                                                </FormLabel>
                                                                <Select onValueChange={field.onChange}>
                                                                        <FormControl>
                                                                                <SelectTrigger className="text-xs w-full rounded-[4px] border-2 placeholder:text-xs focus-visible:ring-[0px]">
                                                                                        <SelectValue 
                                                                                                placeholder="Select category" 
                                                                                        />
                                                                                </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                                {categories.map(cat => (
                                                                                        <SelectItem key={cat} value={cat}>
                                                                                                {cat}
                                                                                        </SelectItem>
                                                                                ))}
                                                                        </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                </div>

                                <FormField
                                        control={form.control}
                                        name="businessDescription"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>
                                                                Business Description
                                                        </FormLabel>
                                                        <FormControl>
                                                                <Textarea 
                                                                        className="rounded-[4px] border-2 placeholder:text-xs text-xs focus-visible:ring-[0px] min-h-32"
                                                                        placeholder="Describe your business briefly..." 
                                                                        {...field}
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <FormInput
                                        control={form.control}
                                        name="businessWebsite"
                                        label="Business Website"
                                        placeholder="https://domain.com"
                                />

                                {/* Logo */}
                                <FormField
                                        control={form.control}
                                        name="businessLogo"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>
                                                                Business Logo (Max 5MB, PNG/JPEG/JPG, 16:6 ratio)
                                                        </FormLabel>
                                                        <FormControl>
                                                                <Input 
                                                                        type="file" 
                                                                        accept="image/png, image/jpeg" 
                                                                        onChange={(e) => field.onChange(e.target.files)} 
                                                                        className="rounded-[4px] border-2 placeholder:text-xs text-xs focus-visible:ring-[0px]"
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Cover Image */}
                                <FormField
                                        control={form.control}
                                        name="businessCover"
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>
                                                                Business Cover Image (Max 10MB, PNG/JPEG/JPG, 1:1 ratio)
                                                        </FormLabel>
                                                        <FormControl>
                                                                <Input 
                                                                        type="file" 
                                                                        accept="image/png, image/jpeg, image/jpg" 
                                                                        onChange={(e) => field.onChange(e.target.files)} 
                                                                        className="rounded-[4px] border-2 placeholder:text-xs text-xs focus-visible:ring-[0px]"
                                                                />
                                                        </FormControl>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                {/* Checkbox */}
                                <FormField
                                        control={form.control}
                                        name="authorisation"
                                        render={({ field }) => (
                                                <FormItem className="flex items-center space-x-2 cursor-pointer">
                                                        <FormControl>
                                                                <Checkbox 
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange} 
                                                                        className="border-black rounded-[4px]"
                                                                />
                                                        </FormControl>
                                                        <FormLabel className="leading-snug text-xs">
                                                                I have legal authorisation to represent this business and provide verification documents if requested.
                                                        </FormLabel>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />

                                <SubmitButton 
                                        status={status}
                                        label="Submit Business" 
                                />

                                <AgreeTerms />
                        </form>
                </Form>
        )
}

export const AgreeTerms = () => {
        return (
                <p className="text-xs text-center text-gray-500 mt-2">
                        By continuing, you agree to Lagos Home Fixers&apos; <Link href={`/terms-and-conditions`} target="_blank" className="underline cursor-pointer">Terms of Use</Link> and <Link href={`/privacy`} target="_blank" className="underline cursor-pointer">Privacy Policy</Link>.
                </p>
        )
}
