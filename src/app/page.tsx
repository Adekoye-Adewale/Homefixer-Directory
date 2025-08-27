import React from 'react'
import FrontPage from '@/components/pages/homePage'
import { getAllBusinesses, getAllBusinessesCategory, getAllBusinessesLocations } from '@/sanity/lib/client'

export default async function HomePage() {

        const [ allBusinessList, allCategories, allLocations ] = await Promise.all([
                getAllBusinesses(),
                getAllBusinessesCategory(),
                getAllBusinessesLocations()
        ])

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
