import React from 'react'
import Image from 'next/image'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import ShareButton from '@/components/layouts/shareButton'
import { Globe, Phone } from 'lucide-react'

type BusinessPageProps = {
        biz: customBusiness
}

export default function SingleBusinessPageComponent({ biz }: BusinessPageProps) {
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
                                                                <p className='text-sm mt-2.5 md:mt-4 text-white/80'>
                                                                        {biz?.businessAddress ?? "1077 broad way, Lagos Island, Lagos."}
                                                                </p>
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
                        <section className='py-5 md:py-10 px-2.5 md:px-5'>
                                <div className='container relative mx-auto'>

                                </div>
                        </section>
                        <section className='flex justify-center items-center py-5 md:py-10 px-2.5 md:px-5 relative overflow-clip'>
                                <div className='container relative mx-auto'>
                                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                                <div className='col-span-1 md:col-span-2 border border-sm border-gray-300 rounded-sm p-5'>
                                                        <p className='text-xs'>
                                                                {biz?.description}
                                                        </p>
                                                </div>
                                                <div className='col-span-1 border border-sm border-gray-300 rounded-sm p-5 space-y-2.5'>
                                                        <div>
                                                                MAP HERE
                                                        </div>
                                                        <div className='text-xs font-semibold  divide-gray-300 divide-y'>
                                                                <div>
                                                                        <p className='my-2.5'>
                                                                                {biz?.businessAddress ?? "1077 broad way, Lagos Island, Lagos."}
                                                                        </p>
                                                                </div>
                                                                <div>
                                                                        <Link 
                                                                                href={`tel:${biz?.businessPhoneNumber || ''}`} 
                                                                                className='flex gap-2 my-2.5 items-center    text-blue-600'
                                                                        >
                                                                                <Phone className='size-3'/>
                                                                                <span>
                                                                                        {biz.businessPhoneNumber ? 'Call now' : 'No phone number'}
                                                                                </span>
                                                                        </Link>
                                                                </div>
                                                                <div>
                                                                        <Link
                                                                                href={`mailto:${biz?.businessEmail || ''}`}
                                                                                className='flex gap-2 my-2.5 items-center   text-blue-600'
                                                                        >
                                                                                <Globe className='size-3' />
                                                                                <span>
                                                                                        {biz.businessEmail ? 'Send mail' : 'No email'}
                                                                                </span>
                                                                        </Link>
                                                                </div>
                                                                <div>
                                                                        <Link
                                                                                href={`${biz?.businessWebsite || ''}`}
                                                                                className='flex gap-2 my-2.5 items-center   text-blue-600'
                                                                        >
                                                                                <Globe className='size-3' />
                                                                                <span>
                                                                                        {biz.businessWebsite ? 'Visit site' : 'No website'}
                                                                                </span>
                                                                        </Link>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className='border border-sm border-gray-300 rounded-sm p-5 mt-5'>
                                                Gallery
                                        </div>
                                </div>
                        </section>
                </main>
        )
}
