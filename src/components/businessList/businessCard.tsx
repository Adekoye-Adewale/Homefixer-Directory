import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, MapPin, SquareArrowOutUpRight, Tag } from 'lucide-react'
import { customBusiness } from '@/sanity/lib/customTypes/business'

type UpdatedType = customBusiness & {
        locationSlug: string
        categorySlug: string
}

export default function MainBusinessCard({ 
        _id,
        coverImage, 
        businessLogo, 
        businessName,
        description, 
        category,  
        location, 
        slug,
        businessWebsite,
        locationSlug,
        categorySlug
} : UpdatedType) {
        return (
                <div 
                        className='grid content-end max-w-[350px] w-full p-2.5 md:p-5 relative rounded border border-solid overflow-hidden group'
                        key={_id}
                >
                        <Image
                                src={coverImage.url}
                                alt={`${businessName} cover image`}
                                width={350}
                                height={230}
                                className='absolute inset-0 size-full object-cover brightness-20 transition-all duration-300 group-hover:brightness-5'
                        />
                        <div className='relative flex flex-col space-y-3'>
                                <Image
                                        src={businessLogo.url}
                                        alt={`${businessName} logo`}
                                        width={32}
                                        height={32}
                                        className='size-8 rounded-full aspect-square object-cover'
                                />
                                <div>
                                        <div>
                                                <h3
                                                        className='text-white font-semibold text-base md:text-lg'
                                                >
                                                        {businessName}
                                                </h3>
                                                <div className='hidden md:block mt-1 md:mt-2'>
                                                        <p className='text-white/70 text-xs md:text-sm line-clamp-2'>
                                                                {description}
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                                <div className='flex flex-wrap gap-2.5 mb-7 items-center text-[10px] md:text-xs font-semibold'>
                                        <Link
                                                href={`/category/${categorySlug}`}
                                                title={category?.title}
                                                className='flex items-center gap-1 flex-nowrap  text-nowrap overflow-clip py-0.5 px-2.5 text-amber-300/50 border border-solid border-amber-300/50 bg-transparent transition-all duration-300 hover:text-amber-200 hover:bg-amber-900 rounded'
                                        >
                                                <Tag className='w-3' />
                                                {category?.title}
                                        </Link>
                                        <Link
                                                href={`/locations/${locationSlug}`}
                                                title={location.title}
                                                className='flex items-center gap-1 text-nowrap overflow-hidden py-0.5 px-2.5  text-amber-300/50 border border-solid border-amber-300/50 bg-transparent transition-all duration-300 hover:text-amber-200 hover:bg-amber-900 rounded'
                                        >
                                                <MapPin 
                                                        className='w-3' 
                                                />
                                                <span>
                                                        {location?.title}
                                                </span>
                                        </Link>
                                </div>
                        </div>
                        <div className='absolute bottom-0 left-0 flex items-center gap-2 py-1 px-2.5 md:py-1.5 md:px-5 bg-amber-300 w-full rounded-t text-left text-[10px] md:text-xs font-semibold divide-x divide-amber-900 whitespace-nowrap'>
                                <Link
                                        href={`/business/${slug?.current}`}
                                        title={`learn more about ${businessName}`}
                                        className='flex items-center gap-1 transition-colors duration-300 hover:text-amber-900 pr-2'
                                >
                                        <span>
                                                View business
                                        </span>
                                        <SquareArrowOutUpRight className='w-3' />
                                </Link>
                                {businessWebsite && 
                                        <Link
                                                href={`${businessWebsite}?referral=lagoshomefixers.com`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='flex items-center gap-1 transition-colors duration-300 hover:text-amber-900'
                                        >
                                                <span className='hidden md:block'>
                                                        Visit website
                                                </span>
                                                <Globe className='w-3'/>
                                        </Link>                                
                                }
                        </div>
                </div>
        )
}
