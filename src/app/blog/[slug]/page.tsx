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

        const plaintextBody = portableTextToPlaintext(blog?.body);

        const shortDescription = truncateDescription(plaintextBody)

        const jsonLd = {
                "@context": "https://schema.org/",
                "@type": "BlogPosting",
                "@id": `${siteURL}/blog`,
                "headline": blog.blogTitle,
                "name": blog.blogTitle,
                "description": shortDescription,
                // "datePublished": "2019-05-14",
                // "dateModified": "2019-05-14",
                "publisher": {
                        "@type": "Organization",
                        "@id": blog.sourceLink,
                        "name": blog.source,
                },
                "image": {
                        "@type": "ImageObject",
                        "@id": blog?.blogImage?.url,
                        "url": blog?.blogImage?.url,
                        "height": "270",
                        "width": "650"
                },
                "url": blog.slug?.current,
                "isPartOf": {
                        "@type": "Blog",
                        "@id": `${siteURL}/blog`,
                        "name": "Lagos Top News and DIY Tips",
                        "publisher": {
                                "@type": "Organization",
                                "@id": siteURL,
                                "name": "Lagos Home Fixers"
                        }
                },
        }

        return (
                <>
                        <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{
                                        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                                }}
                        />
                        <SingleBlogPageComponents 
                                blog={blog}
                                relatedPosts={posts}
                        />
                </>
        )
}
