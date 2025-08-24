import React, { Fragment } from 'react'
import MainBusinessCard from './businessCard'
import { BizContentCardProps } from './businessCardProps'

type MainBusinessListProps = {
        BizContents: BizContentCardProps[]
}

export default function MainBusinessList({ BizContents }: MainBusinessListProps) {
        return (
                <div 
                        className='flex gap-3 md:gap-5'
                >
                        {BizContents.map((content) => (
                                <Fragment key={content._id}>
                                        <MainBusinessCard
                                                coverImgUrl={content.coverImage}
                                                logoUrl={content.businessLogo}
                                                title={content.businessName}
                                                description={content.description}
                                                category={content.category.title}
                                                categorySlug={`/${content.category.title}`}
                                                location={content.location?.title}
                                                locationSlug={`/${content.location?.title}`}
                                                businessSlug={content.slug.current}
                                                businessWebsite={content.businessWebsite}
                                        />
                                </Fragment>
                        ))}
                </div>
        )
}
