import React from 'react'
import { redirect } from 'next/navigation'
import SingleBlogPageComponents from '@/components/pages/blog/singleBlogPageComponents'
import { getAllBlogs, getBlogBySlug } from '@/sanity/lib/client'
import type { Metadata, ResolvingMetadata } from 'next'
import { portableTextToPlaintext } from '@/lib/portableTextToPlaintext'
import { truncateDescription } from '@/lib/truncateDescription'

type BlogPageProps = {
        params: Promise<{ slug: string }>
}

const siteURL = process.env.NEXT_PUBLIC_BASE_URL

export async function generateMetadata(
        { params }: BlogPageProps,
        parent: ResolvingMetadata
): Promise<Metadata> {
        const { slug } = await params
        const blog = await getBlogBySlug(slug)

        const plaintextBody = portableTextToPlaintext(blog?.body);

        const shortDescription = truncateDescription(plaintextBody)

        const previousImages = (await parent).openGraph?.images || []

        return {
                title: blog.blogTitle,
                description: shortDescription,
                openGraph: {
                        type: "website",
                        url: `${siteURL}/blog/${blog.slug?.current}`,
                        title: `${blog.blogTitle} | Lagos Home Fixer`,
                        description: shortDescription,
                        siteName: "Lagos Home Fixer",
                        images: [`${blog?.blogImage.url}`, ...previousImages],
                },
        }
}

export default async function SignleBlogPage({ params }: BlogPageProps ) {

        const { slug } = await params
        const posts = await getAllBlogs()
        const blog = await getBlogBySlug(slug)

        if (!blog) {
                redirect(`/not-found`)
        }

        return (
                <SingleBlogPageComponents 
                        blog={blog}
                        relatedPosts={posts}
                />
        )
}
