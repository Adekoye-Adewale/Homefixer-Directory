import React, { Fragment } from 'react'
import MainBusinessCard from './businessCard'
import { BizContentCardProps } from './businessCardProps'
import { customBusiness } from '@/sanity/lib/customTypes/business'

type MainBusinessListProps = {
        BizContents: customBusiness[]
}

export default function MainBusinessList({ BizContents }: MainBusinessListProps) {
        return (
                <div 
                        className='flex gap-3 md:gap-5'
                >
                        {BizContents.map((content) => (
                                <Fragment key={content._id}>
                                        <MainBusinessCard
                                                coverImage={content.coverImage}
                                                businessLogo={content.businessLogo}
                                                businessName={content.businessName}
                                                description={content.description}
                                                category={content.category}
                                                categorySlug={content.category.slug.current}
                                                location={content.location}
                                                locationSlug={content.location?.slug.current}
                                                slug={content.slug}
                                                businessWebsite={content.businessWebsite}
                                        />
                                </Fragment>
                        ))}
                </div>
        )
}
