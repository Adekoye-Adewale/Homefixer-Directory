import React from 'react'
import CategoryHeroSection from './heroSection'
import MainBusinessList from '@/components/businessList'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import ConnectingBiz from '../homePage/connectingBiz'

type CategoryPageProps = {
        service?: string
        length: number
        businessList: customBusiness[]
}

export default function SingleCategoryPageComponents({ service, length, businessList }: CategoryPageProps ) {

        const copyContent = {
                title: `Discover The Top ${service} in Lagos`,
                paragraph: "Discover the best home-needs service providers here in Lagos to keep your home clean, brand new, and running smoothly, scored by public reviews, expert testings, and social signals.",
        }
        return (
                <main>
                        <CategoryHeroSection
                                copyContent={copyContent}
                        />
                        <section className='py-5 md:py-10 px-2.5 md:px-5'>
                                <div className='container mx-auto space-y-2.5'>
                                        <div>
                                                <span className='text-sm font-semibold'>
                                                        {length} Results found
                                                </span>
                                        </div>
                                        <div>
                                                <MainBusinessList
                                                        BizContents={businessList}
                                                />
                                        </div>
                                </div>                                
                        </section>
                        <ConnectingBiz/>
                </main>
        )
}
