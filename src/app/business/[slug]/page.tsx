import React from 'react'
import { notFound } from 'next/navigation'
import { getBusinessBySlug } from '@/sanity/lib/client'
import SingleBusinessPageComponent from '@/components/pages/business/singleBusiness'
import { getBusinessGoogleData } from '@/lib/getBusinessGoogleInfo'

type LocationPageProps = {
        params: Promise<{ slug: string }>
}

export default async function SingleBusinessPage({ params }: LocationPageProps) {

        const { slug } = await params
        const business = await getBusinessBySlug(slug)

        if ( !business ) {
                notFound();
        }

        const info = await getBusinessGoogleData(business.businessName, business.locationTitle)

        return (
                <>
                        <SingleBusinessPageComponent
                                biz={business}
                                info={info}
                        />
                </>
        )
}
