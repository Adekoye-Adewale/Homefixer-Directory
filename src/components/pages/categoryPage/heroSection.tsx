import React from 'react'
import Image from 'next/image'

type CopyContentProps = {
        copyContent?: {
                title: string
                paragraph: string
        }
}

export default function CategoryHeroSection({ copyContent }: CopyContentProps ) {

        return (
                <section className='flex justify-center items-center py-24 md:py-32 px-2.5 md:px-5 relative overflow-clip min-h-96 max-h-[500px] h-full z-[1]'>
                        <Image 
                                src={'/lagoshomefixer-hero-img.webp'} 
                                alt={'Lagos Home Fixers'} 
                                width={1000} 
                                height={758}
                                className='absolute inset-0 size-full object-cover brightness-10'
                        />
                        <div className='container relative mx-auto'>
                                <div className='text-center text-pretty mb-5 md:mb-8'>
                                        <h1 className='text-center font-bold text-4xl md:text-6xl text-white'>
                                                {copyContent?.title ?? "Discover Your Top Lagos Home Fixers"}
                                        </h1>
                                        <p className='text-sm max-w-3xl mx-auto mt-2.5 md:mt-4 text-white/80'>
                                                {copyContent?.paragraph ?? "Discover the best home needs service providers here in Lagos to keep your home clean, brand new, and running smoothly, scored by public reviews, expert testings, and social signals."}
                                        </p>
                                </div>
                        </div>
                </section>
        )
}
