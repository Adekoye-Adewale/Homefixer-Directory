import React from 'react'
import Image from 'next/image'

type HeroSectionProps = {
        imageUrl: string;
        pageTitle: string;
        pageParagraph: string;
}

export default function HeroSection({ imageUrl, pageTitle, pageParagraph }: HeroSectionProps ) {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5 relative overflow-clip z-[1]'>
                        <Image 
                                src={imageUrl} 
                                alt={pageTitle} 
                                width={1000} 
                                height={758}
                                priority
                                className='absolute inset-0 size-full object-cover brightness-10'
                        />
                        <div className='container relative mx-auto'>
                                <div className='text-center text-pretty'>
                                        <h1 className='font-bold text-4xl md:text-6xl text-white'>
                                                {pageTitle}
                                        </h1>
                                        <p className='text-sm max-w-3xl mx-auto mt-2.5 md:mt-4 text-white/80'>
                                                {pageParagraph}
                                        </p>
                                </div>
                        </div>
                </section>
        )
}
