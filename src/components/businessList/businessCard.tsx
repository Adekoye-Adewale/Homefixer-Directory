import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BusinessCardProps } from './businessCardProps'
import { Globe, SquareArrowOutUpRight } from 'lucide-react'

export default function MainBusinessCard({ 
        coverImgUrl, 
        logoUrl, 
        title,
        description, 
        category, 
        categorySlug, 
        location, 
        locationSlug, 
        businessSlug,
        businessWebsite
} : BusinessCardProps) {
        return (
                <div className='grid content-end max-w-[350px] w-full p-2.5 md:p-5 relative rounded border border-solid overflow-hidden'>
                        <Image
                                src={coverImgUrl}
                                alt={`${title} cover image`}
                                width={350}
                                height={230}
                                className='absolute inset-0 size-full object-cover brightness-20'
                        />
                        <div className='relative flex flex-col space-y-3'>
                                <Image
                                        src={logoUrl}
                                        alt={`${title} logo`}
                                        width={32}
                                        height={32}
                                        className='size-8 rounded-full aspect-square object-cover'
                                />
                                <div>
                                        <div>
                                                <h3
                                                        className='text-white font-semibold text-lg'
                                                >
                                                        {title}
                                                </h3>
                                                <p className='text-white/70 text-sm mt-1 md:mt-2 line-clamp-2'>
                                                        {description}
                                                </p>
                                        </div>
                                </div>
                                <div className='flex gap-2.5 mb-7 items-center text-xs font-semibold'>
                                        <Link
                                                href={categorySlug}
                                                title={category}
                                                className='py-1 px-2.5 text-black bg-amber-300 transition-all duration-300 hover:text-amber-200 hover:bg-amber-900 rounded'
                                        >
                                                {category}
                                        </Link>
                                        <Link
                                                href={locationSlug}
                                                title={location}
                                                className='py-1 px-2.5 text-black bg-amber-300 transition-all duration-300 hover:text-amber-200 hover:bg-amber-900 rounded'
                                        >
                                                {location}
                                        </Link>
                                </div>
                        </div>
                        <div className='absolute bottom-0 left-0 flex items-center gap-2 py-1.5 px-5 bg-white w-full rounded-t text-center text-xs font-semibold'>
                                <Link
                                        href={businessSlug}
                                        title={`learn more about ${title}`}
                                        className='flex items-center gap-1 transition-colors duration-300 hover:text-amber-900'
                                >
                                        <span>
                                                View business
                                        </span>
                                        <SquareArrowOutUpRight className='w-3' />
                                </Link>
                                {businessWebsite && 
                                        <Link
                                                href={`${businessWebsite}?r=lagoshomefixers.com`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='flex items-center gap-1 transition-colors duration-300 hover:text-amber-900'
                                        >
                                                <span>
                                                        Visit website
                                                </span>
                                                <Globe className='w-3'/>
                                        </Link>                                
                                }
                        </div>
                </div>
        )
}
