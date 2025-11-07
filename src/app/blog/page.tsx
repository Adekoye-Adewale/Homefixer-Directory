import React from 'react'
import BlogPageComponent from '@/components/pages/blog'
import { getAllBlogs, getAllBlogsCategory } from '@/sanity/lib/client'

export default async function BlogArchivePage() {

        const posts = await getAllBlogs()
        const categories = await getAllBlogsCategory()
        
        return (
                <BlogPageComponent
                        blogs={posts}
                        categories={categories}
                />
        )
}
