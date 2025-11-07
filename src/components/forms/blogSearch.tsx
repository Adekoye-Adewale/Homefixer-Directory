"use client"

import React, { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { customBlog } from "@/sanity/lib/customTypes/blog"
import { Search } from "lucide-react"
import SideBarBlogCard from "../pages/blog/sideBarBlogCard"

export default function BlogSearch({ blogs }: { blogs: customBlog[] }) {

        const [query, setQuery] = useState("")
        const [open, setOpen] = useState(false)

        const filteredBlogs = blogs.filter(blog =>
                blog.blogTitle.toLowerCase().includes(query.toLowerCase())
        )

        return (
                <div className="w-full mx-auto">
                        <Popover 
                                open={open} 
                                onOpenChange={setOpen}                                
                        >
                                <PopoverTrigger asChild>
                                        <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="cursor-pointer w-full rounded-sm"
                                        >
                                                <span className="w-full flex gap-1 items-center text-xs font-medium opacity-70">
                                                        <Search className="w-2.5"/>
                                                        Search blogs...
                                                </span>
                                        </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-2.5">
                                        <Command>
                                                <CommandInput
                                                        placeholder="Search blog articles..."
                                                        onValueChange={setQuery}
                                                />
                                                <CommandList>
                                                        <CommandEmpty>No results found.</CommandEmpty>
                                                        <CommandGroup heading="Search results">
                                                                <div className='flex flex-col divide-y divide-gray-300/40 space-y-0'>
                                                                        {filteredBlogs.slice(0, 3).map(blog => (
                                                                                <CommandItem 
                                                                                        key={blog._id}
                                                                                >
                                                                                        <SideBarBlogCard 
                                                                                                blog={blog}
                                                                                                className='pb-0'
                                                                                        />
                                                                                </CommandItem>
                                                                        ))}
                                                                </div>
                                                        </CommandGroup>                      
                                                </CommandList>
                                        </Command>
                                </PopoverContent>
                        </Popover>

                </div>
        )
}
