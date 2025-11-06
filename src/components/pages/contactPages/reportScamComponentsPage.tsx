import React from 'react'
import HeroSection from './heroSection'
import { reportScamContents } from '@/contents/reportScam'
import ReportScamForm from '@/components/forms/reportScamForm'

export default function ReportScamComponentsPage() {
        return (
                <main>
                        <HeroSection 
                                imageUrl={reportScamContents.imageUrl}
                                pageTitle={reportScamContents.pageTitle}
                                pageParagraph={reportScamContents.pageParagraph}
                        />
                        <ReportScamBody/>
                </main>
        )
}

const ReportScamBody = () => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5'>
                        <div className='container relative mx-auto'>
                                <div>
                                        <ReportScamForm/>
                                </div>
                        </div>
                </section>
        )
}