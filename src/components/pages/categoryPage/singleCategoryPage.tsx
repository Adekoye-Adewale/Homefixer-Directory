"use client"
import React, { useState, useMemo } from 'react'
import CategoryHeroSection from './heroSection'
import MainBusinessList from '@/components/businessList'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import ConnectingBiz from '../homePage/connectingBiz'
import CategoryFilter from '@/components/filters/categoryFilter'
import { BusinessData } from '@/lib/getBusinessGoogleInfo'

type CategoryPageProps = {
        service?: string
        length: number
        businessList: customBusiness[]
        info: (BusinessData | null)[]
}

export default function SingleCategoryPageComponents({ service, businessList, info }: CategoryPageProps ) {

        const [ selectedLocation, setSelectedLocation ] = useState<string>("All")

        const locations = useMemo(() => {
                const unique = new Map<string, { value: string; label: string }>()
                unique.set("all", { value: "All", label: "All" })
                businessList.forEach((biz) => {
                        if (biz.location?.title) {
                                unique.set(biz.location._id, {
                                        value: biz.location.title,
                                        label: biz.location.title,
                                })
                        }
                })
                return Array.from(unique.values())
        }, [businessList])

        const filteredBusinesses = useMemo(() => {
                if (selectedLocation === "All") return businessList
                return businessList.filter(biz => biz.location?.title === selectedLocation)
        }, [selectedLocation, businessList])

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
                                        <div className='flex md:flex-row items-center justify-between gap-2.5'>
                                                <span className='text-sm font-semibold'>
                                                        {filteredBusinesses.length} Results found
                                                </span>
                                                <CategoryFilter 
                                                        listToFilter={locations} 
                                                        onFilterChange={setSelectedLocation}
                                                        filterType='location'
                                                />
                                        </div>
                                        <div>
                                                <MainBusinessList
                                                        BizContents={filteredBusinesses}
                                                        info={info}
                                                />
                                        </div>
                                </div>                                
                        </section>
                        <ConnectingBiz/>
                </main>
        )
}
