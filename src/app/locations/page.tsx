import LocationPageComponent from '@/components/pages/locationPage'
import { getAllBusinessesLocations } from '@/sanity/lib/client'
import React from 'react'

export default async function LocationPage() {

        const allLocation = await getAllBusinessesLocations()

        return (
                <LocationPageComponent
                        length={allLocation.length}
                        allLocation={allLocation}
                />
        )
}
