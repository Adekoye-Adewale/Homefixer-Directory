import React from 'react'
import { notFound } from 'next/navigation'
import { getBusinessBySlug } from '@/sanity/lib/client'
import SingleBusinessPageComponent from '@/components/pages/business/singleBusiness'
import { getBusinessGoogleData } from '@/lib/getBusinessGoogleInfo'
import type { Metadata, ResolvingMetadata } from 'next'
import { truncateDescription } from '@/lib/truncateDescription'

type BusinessPageProps = {
        params: Promise<{ slug: string }>
}

const siteURL = process.env.NEXT_PUBLIC_BASE_URL

export async function generateMetadata(
        { params }: BusinessPageProps,
        parent: ResolvingMetadata
): Promise<Metadata> {
        const { slug } = await params
        const business = await getBusinessBySlug(slug)

        const shortDescription = truncateDescription(business.description)

        const previousImages = (await parent).openGraph?.images || []

        return {
                title: `${business.businessName} | Lagos Home Fixer`,
                description: shortDescription,
                openGraph: {
                        type: "website",
                        url: `${siteURL}/business/${business.slug?.current}`,
                        title: `${business.businessName} | Lagos Home Fixer`,
                        description: shortDescription,
                        siteName: "Lagos Home Fixer",
                        images: [`${business?.businessLogo.url}`, ...previousImages],
                },
        }
}

export default async function SingleBusinessPage({ params }: BusinessPageProps) {

        const { slug } = await params
        const business = await getBusinessBySlug(slug)
        const shortDescription = truncateDescription(business.description)

        if ( !business ) {
                notFound();
        }

        const jsonLd = {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: business.businessName,
                image: business?.businessLogo.url,
                logo: business?.businessLogo.url,
                description: shortDescription,
                address: {
                        "@type": "PostalAddress",
                        "addressLocality": business?.location?.title,
                        "addressRegion": "LA",
                        "streetAddress": business?.businessAddress,
                },
                telephone: business?.businessPhoneNumber,
                url: `${siteURL}/business/${slug}`,
        }

        const info = await getBusinessGoogleData(business.businessName, business.businessAddress)

        return (
                <>
                        <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{
                                        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                                }}
                        />
                        <SingleBusinessPageComponent
                                biz={business}
                                info={info}
                        />
                </>
        )
}
