import React from 'react'
import Image from 'next/image'
import { howItWorksContents } from '@/contents/howItWorksPage'

export default function HeroSection() {
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
                                                How It Works
                                        </h1>
                                        <p className='text-sm max-w-3xl mx-auto mt-2.5 md:mt-4 text-white/80'>
                                                {howItWorksContents.intro}
                                        </p>
                                </div>
                        </div>
                </section>
        )
}
