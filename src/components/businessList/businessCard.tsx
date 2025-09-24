import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, MapPin, SquareArrowOutUpRight, Tag } from 'lucide-react'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import StarRating from '../mapsComponents/StarRating'
import { BusinessData } from '@/lib/getBusinessGoogleInfo'
import { Badge } from "@/components/ui/badge"
import { linkRefer } from '@/contents/constants'

type UpdatedType = customBusiness & {
        locationSlug: string
        categorySlug: string
        info?: (BusinessData | null)[]
}

export default function MainBusinessCard({ 
        _id,
        coverImage, 
        businessLogo, 
        businessName,
        category,  
        location, 
        slug,
        businessWebsite,
        locationSlug,
        categorySlug,
        info
} : UpdatedType) {

        const rateInfo = info?.find((data) => data?.name.toLowerCase().includes(businessName.toLowerCase()))

        const ratingNumber = rateInfo?.name.toLowerCase().includes(businessName.toLowerCase()) ? rateInfo.rating : null

        return (
                <div 
                        className='grid content-end max-w-[350px] w-full p-2.5 pt-5 md:p-5 relative rounded border border-solid overflow-hidden group'
                        key={_id}
                >
                        <Image
                                src={coverImage.url}
                                alt={`${businessName} cover image`}
                                width={350}
                                height={230}
                                className='absolute inset-0 size-full object-cover brightness-10 md:brightness-20 transition-all duration-300 group-hover:brightness-5'
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
                                                <div className='mt-1 md:mt-2'>
                                                        <StarRating rating={ratingNumber} />
                                                </div>
                                        </div>
                                </div>
                                <div className='flex flex-wrap gap-2.5 mb-7 items-center text-[10px] md:text-xs font-semibold'>
                                        <Link
                                                href={`/category/${categorySlug}`}
                                                title={category?.title}
                                                className='text-amber-300/50 transition-all duration-300 hover:text-amber-200 '
                                        >
                                                <Badge
                                                        variant="outline"
                                                        className="border-[#EE9513]/80 text-[#EE9513] hover:text-white/90 hover:border-white/90 transition-all duration-300"
                                                >
                                                        <Tag className='w-3' />
                                                        {category.title || 'Business Category Here'}
                                                </Badge>
                                        </Link>
                                        <Link
                                                href={`/locations/${locationSlug}`}
                                                title={location.title}
                                                className='text-amber-300/50 transition-all duration-300 hover:text-amber-200'
                                        >
                                                <Badge
                                                        variant="outline"
                                                        className="border-[#EE9513]/80 text-[#EE9513] hover:text-white/90 hover:border-white/90 transition-all duration-300"
                                                >
                                                        <MapPin
                                                                className='w-3'
                                                        />
                                                        {location?.title}
                                                </Badge>
                                        </Link>
                                </div>
                        </div>
                        <div className='absolute bottom-0 left-0 flex items-center gap-2 py-1 px-2.5 md:py-1.5 md:px-5 bg-black w-full rounded-t text-left text-[10px] md:text-xs font-semibold divide-x divide-white/10 whitespace-nowrap'>
                                <Link
                                        href={`/business/${slug?.current}`}
                                        title={`learn more about ${businessName}`}
                                        className='flex items-center gap-1 transition-colors duration-300 text-gray-400 hover:text-white pr-2'
                                >
                                        <span>
                                                View business
                                        </span>
                                        <SquareArrowOutUpRight className='w-3' />
                                </Link>
                                {businessWebsite && 
                                        <Link
                                                href={`${businessWebsite}${linkRefer}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='flex items-center gap-1 transition-colors duration-300 text-gray-400 hover:text-white'
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
