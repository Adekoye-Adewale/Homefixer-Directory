import React from 'react'
import MainBusinessCard from '@/components/businessList/businessCard'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import { BusinessData } from '@/lib/getBusinessGoogleInfo'

type MainBusinessListProps = {
        sectionTitle: string
        archivePageSlug: string
        slugTitle: string
        bg: string
        allBizList: customBusiness[]
        info: (BusinessData | null)[]
}

export default function ListingSection({ sectionTitle, archivePageSlug, slugTitle, allBizList, bg, info }: MainBusinessListProps ) {
        return (
                <section className={`flex justify-center items-center py-24 md:py-32 px-2.5 md:px-5 overflow-clip ${bg}`}>
                        <div className='container mx-auto'>
                                <div className='flex justify-between'>
                                        <h2
                                                className='text-left font-bold text-3xl md:text-4xl'
                                        >
                                                {sectionTitle}
                                        </h2>

                                        <Link 
                                                href={archivePageSlug} 
                                                title={"See all listings"}
                                                className='text-sm text-nowrap items-end-safe md:items-center mt-2 md:mt-2.5 transition-colors duration-300 hover:text-amber-900 flex gap-1'
                                        >
                                                {slugTitle}
                                                <MoveUpRight 
                                                        className='w-3'
                                                />
                                        </Link>
                                </div>
                                <div className='grid grid-cols-2 justify-between lg:grid-cols-4 gap-2.5 md:gap-5 mt-5 md:mt-8'>
                                        {allBizList.slice(0, 12).map((biz) => (
                                                <MainBusinessCard
                                                        key={biz._id}
                                                        coverImage={biz?.coverImage}
                                                        businessLogo={biz.businessLogo}
                                                        businessName={biz.businessName}
                                                        category={biz.category}
                                                        categorySlug={biz.category.slug.current}
                                                        location={biz.location}
                                                        locationSlug={biz.location?.slug.current}
                                                        slug={biz.slug}
                                                        businessWebsite={biz?.businessWebsite}
                                                        info={info}
                                                />
                                        ))}
                                </div>
                        </div>
                </section>
        )
}
