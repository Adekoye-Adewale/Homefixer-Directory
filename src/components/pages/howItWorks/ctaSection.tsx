import React from 'react'
import SubmitYourBizBtn from '@/components/buttons/submitYourBizBtn'
import { howItWorksContents } from '@/contents/howItWorksPage'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react';

export default function CTASection() {
        return (
                <section className='flex justify-center items-center py-5 md:py-10 px-2.5 md:px-5 bg-amber-100'>
                        <div className='container relative mx-auto'>
                                <div className='max-w-2xl mx-auto text-center space-y-5'>
                                        <p className='text-sm font-semibold'>
                                                {howItWorksContents.cta}
                                        </p>
                                        <div className='flex flex-wrap justify-center items-center gap-2.5 mt-5 mx-auto'>
                                                <SubmitYourBizBtn/>
                                                <ExploreListingBtn/>
                                        </div>
                                </div>
                        </div>
                </section>
        )
}

const ExploreListingBtn = () => {
        return (
                <Link
                        href={'/business'}
                        title={'Submit your business'}
                        className='py-2 px-5 flex gap-1 items-center justify-center text-sm font-semibold bg-black text-white border border-solid border-black rounded transition-colors duration-300 hover:bg-transparent hover:text-black'
                >
                        <Search className='size-4' />
                        <span>
                                Explore businesses
                        </span>
                </Link>
        )
}
