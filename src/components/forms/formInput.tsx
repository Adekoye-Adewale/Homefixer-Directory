import React from 'react'
import { Input } from "@/components/ui/input"
import {
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
} from "@/components/ui/form"
import { Control, FieldPath, FieldValues } from "react-hook-form"

type FormInputProps<T extends FieldValues> = {
        control: Control<T>
        name: FieldPath<T>
        label: string
        placeholder?: string
}

export default function FormInput<T extends FieldValues>({
        control,
        name,
        label,
        placeholder,
}: FormInputProps<T>) {
        return (
                <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                                <FormItem>
                                        <FormLabel>
                                                {label}
                                        </FormLabel>
                                        <FormControl>
                                                <Input 
                                                        className="rounded-[4px] border-2 placeholder:text-xs text-xs focus-visible:ring-[0px]"
                                                        placeholder={placeholder} 
                                                        {...field} 
                                                />
                                        </FormControl>
                                        <FormMessage />
                                </FormItem>
                        )}
                />
        )
}
