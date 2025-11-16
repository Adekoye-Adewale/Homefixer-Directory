import React from 'react'
import BlogPageComponent from '@/components/pages/blog'
import { getAllBlogs, getAllBlogsCategory } from '@/sanity/lib/client'

const siteURL = process.env.NEXT_PUBLIC_BASE_URL

export default async function BlogArchivePage() {

        const posts = await getAllBlogs()
        const categories = await getAllBlogsCategory()

        const featuredBlogs = posts.filter((post) => post.featured === true)
        
        const jsonLd = {
                "@context": "https://schema.org/",
                "@type": "BlogPosting",
                "@id": `${siteURL}/blog`,
                "headline": "Lagos Top News and DIY Tips",
                "name": "Lagos Top News and DIY Tips",
                "description": "Stay updated with the top news happening around your home in Lagos and get all the help you need with your DIY side project from Lagos Home Fixers tips section..",
                "datePublished": "2025-06-27",
                "dateModified": "2025-11-16",
                // "author": {
                //         "@type": "Person",
                //         "@id": "https://dataliberate.com/author/richard-wallis/#Person",
                //         "name": "Richard Wallis",
                //         "url": "https://dataliberate.com/author/richard-wallis/",
                //         "image": {
                //                 "@type": "ImageObject",
                //                 "@id": "https://secure.gravatar.com/avatar/bbdd78abba6116d6f5bfa2c992de6592?s=96&d=mm&r=g",
                //                 "url": "https://secure.gravatar.com/avatar/bbdd78abba6116d6f5bfa2c992de6592?s=96&d=mm&r=g",
                //                 "height": "96",
                //                 "width": "96"
                //         }
                // },
                "publisher": {
                        "@type": "Organization",
                        "@id": siteURL,
                        "name": "Lagos Home Fixers",
                        "logo": {
                                "@type": "ImageObject",
                                "@id": `${siteURL}/lagos-homeFix-logo.svg`,
                                "url": `${siteURL}/lagos-homeFix-logo.svg`,
                                "width": "500",
                                "height": "500"
                        }
                },
                "image": {
                        "@type": "ImageObject",
                        "@id": `${siteURL}/lagoshomefixer-hero-img.webp`,
                        "url": `${siteURL}/lagoshomefixer-hero-img.webp`,
                        "height": "1000",
                        "width": "758"
                },
                "url": `${siteURL}/blog`,
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
                        <BlogPageComponent
                                blogs={posts}
                                categories={categories}
                                featuredBlogs={featuredBlogs}
                        />
                </>
        )
}
