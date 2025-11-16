import React from 'react'
import Image from 'next/image'
import ArchivePage from './archivePage'
import { BlogListProps, CategoriesProps, featuredBlogListProps } from './blogTypes'

export default function BlogPageComponent({ blogs, categories, featuredBlogs }: BlogListProps & CategoriesProps & featuredBlogListProps) {
        return (
                <>
                        <HeroSection />
                        <ArchivePage
                                blogs={blogs}
                                categories={categories}
                                featuredBlogs={featuredBlogs}
                        />
                </>
        )
}

const HeroSection = () => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5 relative overflow-clip z-[1]'>
                        <Image 
                                src={'/lagoshomefixer-hero-img.webp'} 
                                alt={'Lagos Home Fixers'} 
                                width={1000} 
                                height={758}
                                className='absolute inset-0 size-full object-cover brightness-10'
                        />
                        <div className='container relative mx-auto'>
                                <div className='text-center text-pretty'>
                                        <h1 className='font-bold text-4xl md:text-6xl text-white'>
                                                Lagos Top News and DIY Tips
                                        </h1>
                                        <p className='text-sm max-w-3xl mx-auto mt-2.5 md:mt-4 text-white/80'>
                                                Stay updated with the top news happening around your home in Lagos and get all the help you need with your DIY side project from Lagos Home Fixers tips section.
                                        </p>
                                </div>
                        </div>
                </section>
        )
}
