"use client"
import { useMemo, useState } from "react"
import CategoryFilter from "@/components/filters/categoryFilter"
import CategoryHeroSection from '../categoryPage/heroSection'
import ConnectingBiz from '../homePage/connectingBiz'
import MainBusinessList from '@/components/businessList'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import { BusinessData } from "@/lib/getBusinessGoogleInfo"

type BusinessPageProps = {
        BizContents: customBusiness[]
        info: (BusinessData | null)[]
}

export default function BusinessPageComponent({ BizContents, info }: BusinessPageProps ) {

        const [selectedLocation, setSelectedLocation] = useState<string>("All")
        const [selectedCategory, setSelectedCategory] = useState<string>("All")

        const locations = useMemo(() => {
                const unique = new Map<string, { value: string; label: string }>()
                BizContents.forEach((biz) => {
                        if (biz.location?.title) {
                                unique.set(biz.location._id, {
                                        value: biz.location.title,
                                        label: biz.location.title,
                                })
                        }
                })
                return [{ value: "All", label: "All" }, ...Array.from(unique.values())]
        }, [BizContents])

        const categories = useMemo(() => {
                const unique = new Map<string, { value: string; label: string }>()
                BizContents.forEach((biz) => {
                        if (biz.category?.title) {
                                unique.set(biz.category._id, {
                                        value: biz.category.title,
                                        label: biz.category.title,
                                })
                        }
                })
                return [{ value: "All", label: "All" }, ...Array.from(unique.values())]
        }, [BizContents])

        const filteredBusinesses = useMemo(() => {
                return BizContents.filter((biz) => {
                        const locationMatch =
                                selectedLocation === "All" || biz.location?.title === selectedLocation
                        const categoryMatch =
                                selectedCategory === "All" || biz.category?.title === selectedCategory
                        return locationMatch && categoryMatch
                })
        }, [selectedLocation, selectedCategory, BizContents])

        return (
                <>
                        <CategoryHeroSection/>

                        <section className='py-10 md:py-20 px-2.5 md:px-5'>
                                <div className='container mx-auto space-y-5'>
                                        <div className="flex flex-wrap gap-2.5 justify-between items-center">
                                                <span className='text-sm font-semibold'>
                                                        {filteredBusinesses.length} Results found
                                                </span>
                                                <div className="w-full max-w-[450px] flex flex-wrap gap-2.5 justify-between">
                                                        <CategoryFilter
                                                                listToFilter={locations}
                                                                onFilterChange={setSelectedLocation}
                                                                filterType="location"
                                                        />
                                                        <CategoryFilter
                                                                listToFilter={categories}
                                                                onFilterChange={setSelectedCategory}
                                                                filterType="category"
                                                        />
                                                </div>
                                        </div>

                                        <MainBusinessList
                                                BizContents={filteredBusinesses}
                                                info={info}
                                        />
                                </div>
                        </section>

                        <ConnectingBiz/>
                </>
        )
}
