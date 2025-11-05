import React from 'react'
import HeroSection from './heroSection'
import { makeEnquireContents } from '@/contents/makeEnquire'
import MakeEnquireForm from '@/components/forms/makeEnquireForm'

export default function MakeEnquireComponentsPage() {
        return (
                <main>
                        <HeroSection 
                                imageUrl={makeEnquireContents.imageUrl}
                                pageTitle={makeEnquireContents.pageTitle}
                                pageParagraph={makeEnquireContents.pageParagraph}
                        />
                        <MakeEnquireBody/>
                </main>
        )
}

const MakeEnquireBody = () => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5'>
                        <div className='container relative mx-auto'>
                                <div>
                                        <MakeEnquireForm/>
                                </div>
                        </div>
                </section>
        )
}