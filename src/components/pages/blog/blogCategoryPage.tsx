import React from 'react'
import Image from 'next/image'
import ArchivePage from './archivePage';
import { customBlog } from '@/sanity/lib/customTypes/blog';
import { customBlogCategoryType } from '@/sanity/lib/customTypes/blogCategory';

type BlogCategoryPageProps = {
        pageTitle: string
        imageUrl?: string
        pageDescription?: string
        posts: customBlog[]
        categories: customBlogCategoryType[]
        featuredBlogs: customBlog[]
}

type HeroSectionProps = {
        pageTitle: string
        imageUrl?: string
        pageDescription?: string
}

export default function BlogCategoryPage({ pageTitle, imageUrl, pageDescription, posts, categories, featuredBlogs }: BlogCategoryPageProps) {
        return (
                <main>
                        <HeroSection 
                                pageTitle={pageTitle} 
                                imageUrl={imageUrl} 
                                pageDescription={pageDescription} 
                        />
                        <ArchivePage
                                blogs={posts}
                                categories={categories}
                                featuredBlogs={featuredBlogs}
                        />
                </main>
        )
}

const HeroSection = ({ pageTitle, imageUrl, pageDescription }: HeroSectionProps ) => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5 relative overflow-clip z-[1]'>
                        <Image 
                                src={imageUrl || `/lagoshomefixer-hero-img.webp`} 
                                alt={`Lagos Home Fixers - ${pageTitle}`} 
                                width={1000} 
                                height={758}
                                className='absolute inset-0 size-full object-cover brightness-10'
                        />
                        <div className='container relative mx-auto'>
                                <div className='text-center text-pretty'>
                                        <h1 className='font-bold text-4xl md:text-6xl text-white'>
                                                {pageTitle}
                                        </h1>
                                        <p className='text-sm max-w-3xl mx-auto mt-2.5 md:mt-4 text-white/80'>
                                                {pageDescription}
                                        </p>
                                </div>
                        </div>
                </section>
        )
}