import React from 'react'
import HeroSection from './heroSection'
import { submitBusinessContents } from '@/contents/submitBusiness'
import SubmitBusinessForm from '@/components/forms/submitBusinessForm'
import BodySectionComponents from './bodySectionComponents'

export default function SubmitBusinessComponentsPage() {
        return (
                <main>
                        <HeroSection 
                                imageUrl={submitBusinessContents.imageUrl}
                                pageTitle={submitBusinessContents.pageTitle}
                                pageParagraph={submitBusinessContents.pageParagraph}
                        />
                        <BodySectionComponents>
                                <SubmitBusinessForm />
                        </BodySectionComponents>
                </main>
        )
}