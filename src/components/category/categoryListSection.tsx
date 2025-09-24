import React from 'react'
import Link from 'next/link'
import { MoveUpRight } from 'lucide-react'
import { customBusinessCategoryType } from '@/sanity/lib/customTypes/businessCategory'
import CategorySlider from '../layouts/categorySlider'

type MainCategoryListProps = {
        sectionTitle?: string
        archivePageSlug?: string
        slugTitle?: string
        bg?: string
        allCategoryList: customBusinessCategoryType[]
}

export default function CategoryListSection({ sectionTitle, archivePageSlug, slugTitle, allCategoryList, bg }: MainCategoryListProps) {
        return (
                <section className={`flex justify-center items-center py-24 md:py-32 px-2.5 md:px-5 overflow-clip ${bg}`}>
                        <div className='container mx-auto'>
                                {archivePageSlug && <div className='flex justify-between'>
                                        <h2
                                                className='text-left font-bold text-3xl md:text-4xl'
                                        >
                                                {sectionTitle}
                                        </h2>

                                        <Link
                                                href={archivePageSlug}
                                                title={"See all listings"}
                                                className='text-sm text-nowrap items-end-safe md:items-center mt-2 md:mt-2.5 transition-colors duration-300 hover:text-amber-900 flex gap-1'
                                        >
                                                {slugTitle}
                                                <MoveUpRight
                                                        className='w-3'
                                                />
                                        </Link>
                                </div>}

                                <CategorySlider
                                        slideContent={allCategoryList}
                                        className="mt-8 md:mt-10"
                                />
                        </div>
                </section>
        )
}
