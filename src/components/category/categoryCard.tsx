import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { customBusinessCategoryType } from '@/sanity/lib/customTypes/businessCategory'

interface CategoryCardProps extends customBusinessCategoryType {
        businessCount: number;
}

export default function CategoryCard({ slug, image, title, businessCount }: CategoryCardProps) {
        return (
                <Link
                        href={`/category/${slug}`}
                        className='relative grid place-content-center aspect-video w-full p-2.5 md:p-5 overflow-hidden rounded group'
                >
                        <Image
                                src={image?.url || '/category.webp'}
                                alt={title}
                                title={title}
                                height={image?.metadata.dimensions.height || 1000}
                                width={image?.metadata.dimensions.width || 667}
                                className='absolute inset-0 size-full object-cover brightness-10 transition-all duration-300 group-hover:brightness-5'
                        />
                        <div
                                className='relative text-center'
                        >
                                <h4 className='text-white font-semibold text-base md:text-lg'>
                                        {title}
                                </h4>
                                <span className='text-white font-bold text-xs '>
                                        {businessCount}
                                </span>
                        </div>
                </Link>
        )
}
