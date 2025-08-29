import React from 'react'
import BusinessPageComponent from '@/components/pages/business'
import { getAllBusinesses } from '@/sanity/lib/client'

export default async function BusinessPage() {

        const businesses = await getAllBusinesses()
        return (
                <main>
                        <BusinessPageComponent 
                                BizContents={businesses}
                        />
                </main>
        )
}
