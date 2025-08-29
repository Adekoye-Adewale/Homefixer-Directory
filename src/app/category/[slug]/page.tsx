import React from 'react'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getBusinessByCategorySlug } from '@/sanity/lib/client'
import SingleCategoryPageComponents from '@/components/pages/categoryPage/singleCategoryPage'
import PriBtn from '@/components/buttons/priBtn'
import SecBtn from '@/components/buttons/secBtn'

type CategoryPageProps = {
        params: Promise<{ slug: string}>
}

export default async function SingleCategoryPage({ params }: CategoryPageProps ) {

        const { slug } = await params

        const [ category, business ] = await Promise.all([
                getCategoryBySlug(slug),
                getBusinessByCategorySlug(slug)
        ])

        if ( !category ) {
                notFound();
        }

        if (business.length === 0) {
                return (
                        <section className='min-h-dvh grid place-content-center'>
                                <div className="text-center py-20">
                                        <h1 className="text-3xl font-bold">
                                                No businesses found
                                        </h1>
                                        <p className="text-gray-600 my-2">
                                                Currently, there are no businesses presently listed under <strong>{category.title}</strong>.
                                        </p>
                                        <div className='flex gap-2 items-center justify-center pt-5'>
                                                <PriBtn
                                                        href='/'
                                                        title='Back home'
                                                />
                                                <SecBtn
                                                        href='/category'
                                                        title='View other services'
                                                />
                                        </div>
                                </div>
                        </section>
                );
        }

        return (
                <SingleCategoryPageComponents
                        service={category.title}
                        length={business.length}
                        businessList={business}
                />
        )
}
