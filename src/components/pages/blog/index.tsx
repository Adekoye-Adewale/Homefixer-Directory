import React from 'react'
import Image from 'next/image'
import ArchivePage from './archivePage'
import { BlogListProps } from './blogTypes'

export default function BlogPageComponent({ blogs }: BlogListProps) {
        return (
                <>
                        <HeroSection />
                        <ArchivePage
                                blogs={blogs}
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
                                                Blog, News, Articles, and Tips
                                        </h1>
                                        <p className='text-sm max-w-3xl mx-auto mt-2.5 md:mt-4 text-white/80'>
                                                Experience hassle-free home services with Lagos Home Fixers. Your trusted partner for all your home improvement needs.
                                        </p>
                                </div>
                        </div>
                </section>
        )
}
