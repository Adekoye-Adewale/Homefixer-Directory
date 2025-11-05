import React from 'react'
import BlogPageComponent from '@/components/pages/blog'
import { getAllBlogs } from '@/sanity/lib/client'

export default async function BlogArchivePage() {

        const posts = await getAllBlogs()

        // console.log("first log - Blog Page", posts)
        
        return (
                <BlogPageComponent
                        blogs={posts}
                />
        )
}
