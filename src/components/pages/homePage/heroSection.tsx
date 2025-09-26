import React from 'react'
import SearchFormWithLocation from '@/components/forms/SearchFormWithLocation'
import { customBusinessLocationType } from '@/sanity/lib/customTypes/businessLocation';
import Image from 'next/image'

export default function HeroSection({ locations }: {
        locations: customBusinessLocationType[];
} ) {
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
                                                Explore Lagos&apos;s Best Home Service Providers
                                        </h1>
                                        <p className='text-sm max-w-3xl mx-auto mt-2.5 md:mt-4 text-white/80'>
                                                Need repairs, renovations, or gardening? Lagos&apos;s Home Fixers connects you with Lagos best home services providers—trusted, fast, and affordable.
                                        </p>
                                </div>
                                {/* <SearchwithLocation/> */}
                                <SearchFormWithLocation locations={locations}/>
                        </div>
                </section>
        )
}
