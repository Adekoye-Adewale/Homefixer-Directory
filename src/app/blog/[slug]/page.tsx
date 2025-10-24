import React from 'react'
import SingleBlogPageComponents from '@/components/pages/blog/singleBlogPageComponents'
import { getAllBlogs, getBlogBySlug } from '@/sanity/lib/client'

type BlogPageProps = {
        params: Promise<{ slug: string }>
}

export default async function SignleBlogPage({ params }: BlogPageProps ) {

        const { slug } = await params
        const posts = await getAllBlogs()
        const blog = await getBlogBySlug(slug)

        console.log("first log", blog)
        return (
                <SingleBlogPageComponents 
                        blog={blog}
                        relatedPosts={posts}
                />
        )
}
