import React, { Fragment } from 'react'
import CategoryHeroSection from './heroSection'
// import CategoryListSection from '@/components/category/categoryListSection'
import { customBusinessCategoryType } from '@/sanity/lib/customTypes/businessCategory'
import ConnectingBiz from '../homePage/connectingBiz'
import CategoryCard from '@/components/category/categoryCard'

type CategoryPageProps = {
        length: number
        allCategory: customBusinessCategoryType[]
}

export default function CategoryPageComponent({ length, allCategory }: CategoryPageProps) {
        return (
                <main>
                        <CategoryHeroSection/>
                        <section className='py-5 md:py-10 px-2.5 md:px-5'>
                                <div className='container mx-auto space-y-2.5'>
                                        <div>
                                                <span className='text-sm font-semibold'>
                                                        {length} Results found
                                                </span>
                                        </div>
                        
                                        <div className='grid grid-cols-2 justify-between lg:grid-cols-4 md:gap-5 gap-3 '>
                                                {allCategory.map((list) => (
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
                        <ConnectingBiz/>
                </main>
        )
}
