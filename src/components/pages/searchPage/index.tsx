import React from 'react'
import HeroSection from './heroSection'
import BodySection from './bodySection'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import { BusinessData } from '@/lib/getBusinessGoogleInfo'
import { customBusinessLocationType } from '@/sanity/lib/customTypes/businessLocation'

type PageProps = {
        name?: string
        location?: string
        businesses: customBusiness[]
        allLocations: customBusinessLocationType[]
        info: (BusinessData | null)[]
}

export default function SearchPageComponents({ name, location, businesses, allLocations, info }: PageProps) {
        return (
                <>
                        <HeroSection
                                name={name}
                                location={location}
                                businesses={businesses}
                                allLocations={allLocations}
                        />
                        <BodySection
                                businesses={businesses}
                                info={info}
                        />
                </>
        )
}
