import React, { Fragment } from 'react'
import MainBusinessCard from './businessCard'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import { BusinessData } from '@/lib/getBusinessGoogleInfo'

type MainBusinessListProps = {
        BizContents: customBusiness[]
        info: (BusinessData | null)[]
}

export default function MainBusinessList({ BizContents, info }: MainBusinessListProps) {

        return (
                <div 
                        className='grid grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-2.5 md:gap-5'
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
                                                info={info}
                                        />
                                </Fragment>
                        ))}
                </div>
        )
}
