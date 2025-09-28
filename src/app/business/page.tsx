import React from 'react'
import BusinessPageComponent from '@/components/pages/business'
import { getAllBusinesses } from '@/sanity/lib/client'
import { getBusinessGoogleData } from '@/lib/getBusinessGoogleInfo'

export default async function BusinessPage() {

        const businesses = await getAllBusinesses()

        const info = await Promise.all(
                businesses.map(biz =>
                        getBusinessGoogleData(biz.businessName, biz.businessAddress ?? biz.location.title)
                )
        )
        
        return (
                <main>
                        <BusinessPageComponent 
                                BizContents={businesses}
                                info={info}
                        />
                </main>
        )
}
