import React from 'react'
import { notFound } from 'next/navigation'
import { getBusinessBySlug } from '@/sanity/lib/client'

type LocationPageProps = {
        params: Promise<{ slug: string }>
}

export default async function SingleBusinessPage({ params }: LocationPageProps) {

        const { slug } = await params
        const business = await getBusinessBySlug(slug)

        if ( !business ) {
                notFound();
        }

        return (
                <>
                        SingleBusinessPage: {slug}
                        business data: {JSON.stringify(business)}
                </>
        )
}
