import React, { Fragment } from 'react'
import Link from 'next/link'
import { MoveUpRight } from 'lucide-react'
import { customBusinessCategoryType } from '@/sanity/lib/customTypes/businessCategory'
import CategoryCard from './categoryCard'

type MainCategoryListProps = {
        sectionTitle: string
        archivePageSlug: string
        slugTitle: string
        bg: string
        allCategoryList: customBusinessCategoryType[]
}

export default function CategoryListSection({ sectionTitle, archivePageSlug, slugTitle, allCategoryList, bg }: MainCategoryListProps) {
        return (
                <section className={`flex justify-center items-center py-24 md:py-32 px-2.5 md:px-5 overflow-clip ${bg}`}>
                        <div className='container mx-auto'>
                                <div className='flex justify-between'>
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
                                </div>
                                <div className='grid grid-cols-2 justify-between lg:grid-cols-4 gap-5 mt-5 md:mt-8'>
                                        {allCategoryList.map((list) => (
                                                <Fragment key={list._id}>
                                                        <CategoryCard
                                                                slug={list.slug}
                                                                image={list.image}
                                                                title={list.title}
                                                        />
                                                </Fragment>
                                        ))}
                                </div>
                        </div>
                </section>
        )
}
