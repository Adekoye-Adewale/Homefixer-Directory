import React from 'react'
import HeroSection from './heroSection'
import { makeEnquireContents } from '@/contents/makeEnquire'
import MakeEnquireForm from '@/components/forms/makeEnquireForm'
import BodySectionComponents from './bodySectionComponents'

export default function MakeEnquireComponentsPage() {
        return (
                <main>
                        <HeroSection 
                                imageUrl={makeEnquireContents.imageUrl}
                                pageTitle={makeEnquireContents.pageTitle}
                                pageParagraph={makeEnquireContents.pageParagraph}
                        />
                        <BodySectionComponents>
                                <MakeEnquireForm />
                        </BodySectionComponents>
                </main>
        )
}