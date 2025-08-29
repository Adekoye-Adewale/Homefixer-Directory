import React, { Fragment } from 'react'
import CategoryHeroSection from '../categoryPage/heroSection'
import ConnectingBiz from '../homePage/connectingBiz'
import LocationCard from '@/components/location/locationCard'
import { customBusinessLocationType } from '@/sanity/lib/customTypes/businessLocation'

type LocationPageProps = {
        length: number
        allLocation: customBusinessLocationType[]
}

export default function LocationPageComponent({ length, allLocation }: LocationPageProps) {

        return (
                <main>
                        <CategoryHeroSection/>

                        <section className='py-5 md:py-10 px-2.5 md:px-5'>
                                <div className='container mx-auto space-y-2.5'>
                                        <div>
                                                <span className='text-sm font-semibold'>
                                                        {length} Loactions found
                                                </span>
                                        </div>
                        
                                        <div className='grid grid-cols-2 justify-between lg:grid-cols-4 md:gap-5 gap-3 '>
                                                {allLocation.map((list) => (
                                                        <Fragment key={list._id}>
                                                                <LocationCard
                                                                        slug={list.slug}
                                                                        image={list.image}
                                                                        title={list.title}
                                                                />
                                                        </Fragment>
                                                ))}
                                        </div>
                                </div>
                        </section>

                        <ConnectingBiz/>
                </main>
        )
}
