import React from 'react'
import HeroSection from './heroSection'
import { submitBusinessContents } from '@/contents/submitBusiness'
import SubmitBusinessForm from '@/components/forms/submitBusinessForm'

export default function SubmitBusinessComponentsPage() {
        return (
                <main>
                        <HeroSection 
                                imageUrl={submitBusinessContents.imageUrl}
                                pageTitle={submitBusinessContents.pageTitle}
                                pageParagraph={submitBusinessContents.pageParagraph}
                        />
                        <SubmitBusinessBody />
                </main>
        )
}

const SubmitBusinessBody = () => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5'>
                        <div className='container relative mx-auto'>
                                <div>
                                        <SubmitBusinessForm/>
                                </div>
                        </div>
                </section>
        )
}