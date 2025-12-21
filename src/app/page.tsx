import React from 'react'
import FrontPage from '@/components/pages/homePage'
import { getAllBusinesses, getAllBusinessesCategory, getAllBusinessesLocations } from '@/sanity/lib/client'
import { getBusinessGoogleData } from '@/lib/getBusinessGoogleInfo'

export default async function HomePage() {

        const [allBusinessList, allCategories, allLocations ] = await Promise.all([
                getAllBusinesses(),
                getAllBusinessesCategory(),
                getAllBusinessesLocations()
        ])

        const info = await Promise.all(
                allBusinessList.map(biz =>
                        getBusinessGoogleData(biz.businessName, biz.businessAddress ?? biz.location.title)
                )
        )

        return (
                <>
                        <FrontPage
                                allBizList={allBusinessList}
                                allLocationList={allLocations}
                                allCategoryList={allCategories}
                                info={info}
                                locations={allLocations}
                        />
                </>
        )
}
