"use client"
import React, { useState, useMemo } from 'react'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import CategoryHeroSection from '../categoryPage/heroSection'
import ConnectingBiz from '../homePage/connectingBiz'
import MainBusinessList from '@/components/businessList'
import CategoryFilter from '@/components/filters/categoryFilter'

type LocationPageProps = {
        location?: string
        length: number
        businessList: customBusiness[]
}

export default function SingleLocationPageComponent({ location, businessList }: LocationPageProps) {

                const [ selectedCategory, setSelectedCategory ] = useState<string>("All")
        
                const category = useMemo(() => {
                        const unique = new Map<string, { value: string; label: string }>()
                        unique.set("all", { value: "All", label: "All" })
                        businessList.forEach((biz) => {
                                if (biz.category?.title) {
                                        unique.set(biz.category._id, {
                                                value: biz.category.title,
                                                label: biz.category.title,
                                        })
                                }
                        })
                        return Array.from(unique.values())
                }, [businessList])
        
                const filteredBusinesses = useMemo(() => {
                        if (selectedCategory === "All") return businessList
                        return businessList.filter(biz => biz.category?.title === selectedCategory)
                }, [selectedCategory, businessList])

        const copyContent = {
                title: `Discover The Top Home Service Businesses in ${location}`,
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
                                                        listToFilter={category} 
                                                        onFilterChange={setSelectedCategory}
                                                        filterType='category'
                                                />
                                        </div>
                                        <div>
                                                <MainBusinessList
                                                        BizContents={filteredBusinesses}
                                                />
                                        </div>
                                </div>                                
                        </section>
                        <ConnectingBiz/>
                </main>
        )
}
