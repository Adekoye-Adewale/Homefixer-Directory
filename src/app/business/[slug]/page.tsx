import React from 'react'
import { notFound } from 'next/navigation'
import { getBusinessBySlug } from '@/sanity/lib/client'
import SingleBusinessPageComponent from '@/components/pages/business/singleBusiness'

type LocationPageProps = {
        params: Promise<{ slug: string }>
}

export default async function SingleBusinessPage({ params }: LocationPageProps) {

        const { slug } = await params
        const business = await getBusinessBySlug(slug)

        if ( !business ) {
                notFound();
        }

        // console.log(business)

        return (
                <>
                        {/* SingleBusinessPage: {slug}
                        business data: {JSON.stringify(business)} */}
                        <SingleBusinessPageComponent
                                biz={business}
                        />
                </>
        )
}
