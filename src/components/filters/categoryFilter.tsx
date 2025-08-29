"use client"
import React, { useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
        Command,
        CommandEmpty,
        CommandGroup,
        CommandInput,
        CommandItem,
        CommandList,
} from "@/components/ui/command"
import {
        Popover,
        PopoverContent,
        PopoverTrigger,
} from "@/components/ui/popover"

type listToFilterType = {
        value: string;
        label: string;
}[]

export default function CategoryFilter({ 
        listToFilter,
        filterType,
        onFilterChange, 
}: { 
        listToFilter: listToFilterType
        filterType?: string
        onFilterChange: (value: string) => void 
}) {

        const [open, setOpen] = useState(false)
        const [value, setValue] = useState("")

        const handleSelect = (currentValue: string) => {
                const newValue = currentValue === value ? "" : currentValue
                setValue(newValue)
                onFilterChange(newValue)
                setOpen(false)
        }

        return (
                <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                                <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between"
                                >
                                        {value
                                                ? listToFilter.find((list) => list.value === value)?.label
                                                : `Filter by ${filterType}...`}
                                        <ChevronsUpDown className="opacity-50" />
                                </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                                <Command>
                                        <CommandInput placeholder="Search framework..." className="h-9" />
                                        <CommandList>
                                                <CommandEmpty>No category found.</CommandEmpty>
                                                <CommandGroup>
                                                        {listToFilter.map((list) => (
                                                                <CommandItem
                                                                        key={list.value}
                                                                        value={list.value}
                                                                        onSelect={handleSelect}
                                                                >
                                                                        {list.label}
                                                                        <Check
                                                                                className={cn(
                                                                                        "ml-auto",
                                                                                        value === list.value ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                        />
                                                                </CommandItem>
                                                        ))}
                                                </CommandGroup>
                                        </CommandList>
                                </Command>
                        </PopoverContent>
                </Popover>
        )
}
