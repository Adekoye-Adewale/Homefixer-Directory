import React from 'react'
import HeroSection from './heroSection'
import { reportScamContents } from '@/contents/reportScam'
import ReportScamForm from '@/components/forms/reportScamForm'
import BodySectionComponents from './bodySectionComponents'

export default function ReportScamComponentsPage() {
        return (
                <main>
                        <HeroSection 
                                imageUrl={reportScamContents.imageUrl}
                                pageTitle={reportScamContents.pageTitle}
                                pageParagraph={reportScamContents.pageParagraph}
                        />
                        <BodySectionComponents>
                                <ReportScamForm />
                        </BodySectionComponents>
                </main>
        )
}