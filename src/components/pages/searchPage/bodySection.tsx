import React from 'react'
import MainBusinessList from '@/components/businessList'
import { SearchPageBusinessListProps } from './SearchPageTypes'

export default function BodySection({ businesses, info }: SearchPageBusinessListProps) {
        return (
                <section className='flex justify-center items-center py-5 md:py-10 px-2.5 md:px-5 relative overflow-clip'>
                        <div className='container relative mx-auto'>
                                {businesses.length === 0 ? (
                                        <p className="text-center text-sm  text-black">
                                                No business matching your search found.
                                        </p>
                                ) : (
                                        <MainBusinessList
                                                BizContents={businesses}
                                                info={info}
                                        />
                                )}
                        </div>
                </section>
        )
}
