import React from 'react'
import Image from 'next/image'
import { SearchPageProps } from './SearchPageTypes'
import SearchFormWithLocation from '@/components/forms/SearchFormWithLocation'

export default function HeroSection({ name, location, businesses, allLocations }: SearchPageProps) {
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
                                        <h1 className='font-bold text-2xl md:text-4xl text-white'>
                                                Search Results for {name ? `${name}` : `businesses`} {location ? `in ${location}` : ``}
                                        </h1>
                                </div>
                                <div className='mt-5'>
                                        {businesses && businesses.length === 0 && (
                                                <>
                                                        <SearchFormWithLocation
                                                                locations={allLocations ?? []}
                                                        />
                                                </>
                                        )}
                                </div>
                        </div>
                </section>
        )
}
