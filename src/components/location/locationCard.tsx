import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { customBusinessLocationType } from '@/sanity/lib/customTypes/businessLocation'

export default function LocationCard({ slug, image, title }: customBusinessLocationType) {
        return (
                <Link 
                        href={`/${slug}`}
                        className='relative grid place-content-center aspect-video w-full p-2.5 md:p-5 overflow-hidden rounded group'
                >
                        <Image
                                src={image?.url || '/location.webp'}
                                alt={title}
                                title={title}
                                height={image?.metadata.dimensions.height || 1000}
                                width={image?.metadata.dimensions.width || 700}
                                className='absolute inset-0 size-full object-cover brightness-20 transition-all duration-300 group-hover:brightness-5'
                        />
                        <div
                                className='relative text-center'
                        >
                                <span className='text-white font-semibold text-base md:text-lg'>
                                        {title}
                                </span>
                        </div>
                </Link>
        )
}
