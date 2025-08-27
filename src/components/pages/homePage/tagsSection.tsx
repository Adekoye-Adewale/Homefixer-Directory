import React from 'react'
import Link from 'next/link'

type TagSectionProps = {
        sectionTitle: string
        tagArchivePageSlug: string
        slugTitle: string
        allTagList: string
}

export default function TagsSection({ sectionTitle, tagArchivePageSlug, slugTitle }: TagSectionProps) {
        return (
                <section className='flex justify-center items-center py-24 md:py-32 px-2.5 md:px-5 overflow-clip'>
                        <div className='container mx-auto'>
                                <div className='flex justify-between'>
                                        <h2
                                                className='text-left font-bold text-3xl md:text-4xl'
                                        >
                                                {sectionTitle}
                                        </h2>

                                        <Link
                                                href={tagArchivePageSlug}
                                                title={"See all listings"}
                                                className='text-sm text-nowrap items-end-safe md:items-center mt-2 md:mt-2.5'
                                        >
                                                {slugTitle}
                                        </Link>
                                </div>
                                <div>
                                        
                                </div>
                        </div>
                </section>
        )
}
