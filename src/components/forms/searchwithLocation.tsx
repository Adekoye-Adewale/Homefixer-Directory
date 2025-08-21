"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
        Form,
        FormControl,
        FormDescription,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { lagosLocations } from './formTypes'

const searchFormSchema = z.object({
        businessName: z.string().min(2, {
                message: "Business name must be at least 2 characters.",
        }),
        location: z.string().min(1, {
                message: "Please select a location.",
        }),
})

type SearchFormValues = z.infer<typeof searchFormSchema>

export default function SearchwithLocation() {

        const form = useForm<SearchFormValues>({
                resolver: zodResolver(searchFormSchema),
                defaultValues: {
                        businessName: "",
                        location: "",
                },
        })

        const onSubmit = (values: SearchFormValues) => {
                console.log(values)
        }

        return (
                <Form {...form}>
                        <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-2 max-w-lg md:max-w-3xl mx-auto"
                        >
                                <div className='flex gap-5 items-start'>
                                        {/* Business Name */}
                                        <FormField
                                                control={form.control}
                                                name="businessName"
                                                render={({ field }) => (
                                                        <FormItem className='w-full grow'>
                                                                <FormLabel 
                                                                        className='text-white/80'
                                                                >
                                                                        Business Name
                                                                </FormLabel>
                                                                <FormControl>
                                                                        <Input
                                                                                className='text-xs placeholder:text-xs rounded text-white/90'
                                                                                placeholder="What business are you looking for today?"
                                                                                {...field}
                                                                        />
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />

                                        {/* Location */}
                                        <FormField
                                                control={form.control}
                                                name="location"
                                                render={({ field }) => (
                                                        <FormItem className='w-full grow'>
                                                                <FormLabel
                                                                        className='text-white/80'
                                                                >
                                                                        Location
                                                                </FormLabel>
                                                                <FormControl>
                                                                        <Select 
                                                                                onValueChange={field.onChange} 
                                                                                defaultValue={field.value}
                                                                        >
                                                                                <SelectTrigger className='w-full text-xs placeholder:text-xs grow rounded text-white/90'>
                                                                                        <SelectValue 
                                                                                                placeholder="Select a location" 
                                                                                                className='w-full '
                                                                                        />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                        {lagosLocations.map((location) => (
                                                                                                <SelectItem 
                                                                                                        key={location.value} 
                                                                                                        value={location.value}
                                                                                                >
                                                                                                        {location.title}
                                                                                                </SelectItem>
                                                                                        ))}
                                                                                </SelectContent>
                                                                        </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                </div>

                                <Button 
                                        type="submit" 
                                        className="w-full cursor-pointer bg-[#057CC5] text-black border border-solid border-[#057cc5] hover:bg-amber-50 rounded"
                                >
                                        Search
                                </Button>
                        </form>
                </Form>
        )
}
