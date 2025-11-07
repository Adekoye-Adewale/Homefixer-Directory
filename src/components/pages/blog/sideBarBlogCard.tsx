import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { customBlog } from '@/sanity/lib/customTypes/blog'

type BlogProps = {
        blog: customBlog
        className?: string
}

export default function SideBarBlogCard({ blog, className="" }: BlogProps ) {
        return (
                <Link href={`/blog/${blog.slug?.current}`} className={`flex items-center gap-2.5 w-full group ${className}`}>
                        {blog.blogImage?.url && (
                                <Image
                                        src={blog.blogImage.url}
                                        alt={blog.blogTitle}
                                        width={100}
                                        height={67}
                                        className="w-10 h-10 object-cover rounded-md"
                                />
                        )}
                        <span className='text-xs font-normal text-black/80 line-clamp-2 group-hover:text-black transition-colors duration-300'>
                                {blog.blogTitle}
                        </span>
                </Link>
        )
}
