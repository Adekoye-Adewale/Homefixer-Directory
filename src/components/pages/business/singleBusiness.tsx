import React from 'react'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import ShareButton from '@/components/layouts/shareButton'
import SingleBusinessMapGoogle from '@/components/mapsComponents/singleBusinessMapGoogle'
import SingleBusinessPageRatingSection from './singleBusinessPageRatingSection'
import { Globe, Mail, Phone, SquareArrowOutUpRight } from 'lucide-react'
import { BusinessData } from '@/lib/getBusinessGoogleInfo'
import StarRating from '@/components/mapsComponents/StarRating'
import ConnectingBiz from '../homePage/connectingBiz'

type ConatctProps = {
        businessAddress?: string
        businessName: string
        businessPhoneNumber?: string
        businessEmail?: string
        businessWebsite?: string
}

export default function SingleBusinessPageComponent(
        {
                biz,
                info 
        }: {
                        biz: customBusiness; 
                info: BusinessData | null
}) {
        return (
                <main>
                        <section className='flex justify-center items-center py-24 md:py-32 px-2.5 md:px-5 relative overflow-clip min-h-96 max-h-[500px] h-full z-[1]'>
                                <Image 
                                        src={biz?.coverImage.url || '/lagoshomefixer-hero-img.webp'} 
                                        alt={`${biz?.businessName} cover image` || 'Lagos Home Fixers'} 
                                        width={1000} 
                                        height={758}
                                        className='absolute inset-0 size-full object-cover brightness-10'
                                />
                                <div className='container relative mx-auto'>
                                        <div className='flex flex-col mx-auto md:flex-row items-end justify-between gap-5'>
                                                <div className='mx-auto md:mx-0'>
                                                        <div className='mb-5'>
                                                                <Image
                                                                        src={biz.businessLogo.url }
                                                                        alt={`${biz?.businessName} logo image` || 'Lagos Home Fixers'}
                                                                        width={1000}
                                                                        height={758}
                                                                        className='mx-auto md:mx-0 size-32 object-cover rounded-full'
                                                                />
                                                        </div>
                                                        <div className='text-center md:text-left md:max-w-80 space-y-2.5'>
                                                                <h1 className='font-bold text-2xl md:text-3xl text-white'>
                                                                        {biz?.businessName ?? "Business Name Here"}
                                                                </h1>
                                                                <div className="flex flex-col  items-center md:items-start gap-1 text-white/70">
                                                                        <span className="flex items-center gap-1  text-xs font-bold">
                                                                                        <StarRating rating={info?.rating ?? null} />
                                                                                {info && info.rating > 0 && <span>
                                                                                        {info.rating.toFixed(1)}
                                                                                </span>}
                                                                        </span>
                                                                        <span className="text-xs">
                                                                                Based on  {info?.user_ratings_total} Google reviews
                                                                        </span>
                                                                </div>
                                                                <div className='flex gap-2.5 justify-center md:justify-start flex-wrap '>
                                                                        <Link 
                                                                                href={biz.category.slug.current ? `/category/${biz.category.slug.current}` : '#'}
                                                                                target='_blank' 
                                                                                className='text-xs text-white/80'
                                                                        >
                                                                                <Badge
                                                                                        variant="outline"
                                                                                        className="border-[#EE9513]/80 text-[#EE9513] hover:text-white/90 hover:border-white/90 transition-all duration-300"
                                                                                >
                                                                                        {biz?.category.title || 'Business Category Here'}
                                                                                </Badge>        
                                                                        </Link> 
                                                                        <Link 
                                                                                href={biz.location.slug.current ? `/category/${biz.location.slug.current}` : '#'}
                                                                                target='_blank' 
                                                                                className='text-xs text-white/80'
                                                                        >
                                                                                <Badge
                                                                                        variant="outline"
                                                                                        className="border-[#EE9513]/80 text-[#EE9513] hover:text-white/90 hover:border-white/90 transition-all duration-300"
                                                                                >
                                                                                        {biz?.location.title || 'Business Location Here'}
                                                                                </Badge>        
                                                                        </Link>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div className='mx-auto md:mx-0'>
                                                        <ShareButton/>
                                                </div>
                                        </div>
                                </div>
                        </section>
                        <section className='flex justify-center items-center pt-5 md:pt-10 px-2.5 md:px-5 relative overflow-clip'>
                                <div className='container relative mx-auto'>
                                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                                <Description 
                                                        description={biz?.description || 'No description provided for this business.'} 
                                                />
                                                <Contact 
                                                        businessName={biz.businessName}
                                                        businessAddress={biz.businessAddress || 'Business address not available.'} 
                                                        businessEmail={biz?.businessEmail || undefined} 
                                                        businessPhoneNumber={biz?.businessPhoneNumber || undefined} businessWebsite={biz?.businessWebsite || undefined} 
                                                />
                                        </div>
                                        <div className='border border-sm border-gray-300 rounded-sm p-5 mt-5'>
                                                <h3 className='font-bold text-sm mb-2.5'>
                                                        Gallery
                                                </h3>
                                        </div>
                                </div>
                        </section>
                        <SingleBusinessPageRatingSection 
                                info={info} 
                                businessName={biz.businessName} 
                        />
                        <ConnectingBiz/>
                </main>
        )
}

const Description = ({ description }: { description: string }) => {
        return (
                <div className='col-span-1 md:col-span-2 border border-sm border-gray-300 rounded-sm p-5'>
                        <h3 className='font-bold text-sm mb-2.5'>
                                Description
                        </h3>
                        <p className='text-sm leading-6'>
                                {description ? description : 'No description provided for this business.'}
                        </p>
                </div>
        )
}

const Contact = ({ businessAddress, businessName, businessPhoneNumber, businessWebsite, businessEmail }: ConatctProps) => {
        return (
                <div className='col-span-1 border border-sm border-gray-300 rounded-sm p-5 space-y-2.5'>
                        <div>
                                <h3 className='font-bold text-sm mb-2.5'>
                                        Contact information
                                </h3>
                                <SingleBusinessMapGoogle
                                        businessAddress={businessAddress || 'Lagos Island, Lagos, Nigeria.'}
                                        businessName={businessName || 'Business Name'}
                                />
                                {businessAddress && <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                                        businessAddress
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex gap-1 items-center text-xs font-semibold my-2.5 text-blue-600"
                                        >
                                                <span>
                                                        Get directions
                                                </span>
                                                <SquareArrowOutUpRight className='size-3' />
                                        </a>
                                }
                        </div>
                        <div className='text-xs font-semibold  divide-gray-300 divide-y'>
                                <div>
                                        <p className='font-medium my-2.5'>
                                                {businessAddress ?? "Business address not available."}
                                        </p>
                                </div>
                                <div>
                                        {businessPhoneNumber && (
                                                <Link
                                                        href={`tel:${businessPhoneNumber}`}
                                                        className='flex gap-2 my-2.5 items-center text-blue-600'
                                                >
                                                        <Phone className='size-3' />
                                                        <span>
                                                                Call now
                                                        </span>
                                                </Link>
                                        )}
                                </div>
                                <div>
                                        {businessEmail && (
                                                <Link
                                                        href={`mailto:${businessEmail}`}
                                                        className='flex gap-2 my-2.5 items-center   text-blue-600'
                                                >
                                                        <Mail className='size-3' />
                                                        <span>
                                                               Send mail
                                                        </span>
                                                </Link>
                                        )}
                                        
                                </div>
                                <div>
                                        {businessWebsite && (
                                                <Link
                                                        href={`${businessWebsite}?referral=lagoshomefixers.com`}
                                                        target='_blank'
                                                        className='flex gap-2 my-2.5 items-center   text-blue-600'
                                                >
                                                        <Globe className='size-3' />
                                                        <span>
                                                                Visit site
                                                        </span>
                                                </Link>
                                        )}
                                </div>
                        </div>
                </div>
        )
}