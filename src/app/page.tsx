import React from 'react'
import FrontPage from '@/components/pages/homePage'
import { getAllBusinesses, getAllBusinessesCategory, getAllBusinessesLocations } from '@/sanity/lib/client'

export default async function HomePage() {

        const allBusinessList = await getAllBusinesses()
        const allCategories = await getAllBusinessesCategory()
        const allLocations = await getAllBusinessesLocations()

        // console.log('--===-=-==', allBusinessList)
        // console.log('--===-=-==', allLocations)
        // console.log('--===-=-==', allCategories)

        return (
                <>
                        <FrontPage
                                allBizList={allBusinessList}
                                allLocationList={allLocations}
                                allCategoryList={allCategories}
                        />
                </>
        )
}
