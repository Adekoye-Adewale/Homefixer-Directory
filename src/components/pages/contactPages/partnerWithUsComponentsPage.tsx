import React, { Fragment } from 'react'
import HeroSection from './heroSection'
import { partnerWithUsContents } from '@/contents/partnerWithUs'
import PartnerWithUsForm from '@/components/forms/partnerWithUsForm';

type SectionWithCardsProps = {
        sectionTitle: string;
        items: { 
                id: number; 
                title: string; 
                description: string 
        }[];
}

export default function PartnerWithUsComponentsPage() {
        return (
                <main>
                        <HeroSection
                                imageUrl={partnerWithUsContents.imageUrl}
                                pageTitle={partnerWithUsContents.pageTitle}
                                pageParagraph={partnerWithUsContents.pageParagraph}
                        />
                        <PartnerWithUsBody/>
                </main>
        )
}

const PartnerWithUsBody = () => {
        return (
                <>
                        <WhySection
                                sectionTitle='Why Advertise on Lagos Home Fixers?'
                                items={partnerWithUsContents.why}
                        />
                        <HowSection
                                sectionTitle='How It Works'
                                items={partnerWithUsContents.how}
                        />
                        <FormSection/>
                </>
        )
}

const WhySection = ({ sectionTitle, items }: SectionWithCardsProps ) => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5'>
                        <div className='container relative mx-auto'>
                                <div>
                                        <h2 className='font-semibold text-2xl text-center mb-5'>
                                                {sectionTitle}
                                        </h2>
                                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 '>
                                                {items.map((item) => (
                                                        <Fragment key={item.id}>
                                                                <Card
                                                                        key={item.id}
                                                                        title={item.title}
                                                                        description={item.description}
                                                                />
                                                        </Fragment>
                                                ))}
                                        </div>
                                </div>
                        </div>
                </section>
        )
}

const HowSection = ({ sectionTitle, items }: SectionWithCardsProps ) => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5 bg-amber-50'>
                        <div className='container relative mx-auto'>
                                <div>
                                        <h2 className='font-semibold text-2xl text-center mb-5'>
                                                {sectionTitle}
                                        </h2>
                                        <div className='flex flex-col md:flex-row gap-5'>
                                                {items.map((item) => (
                                                        <Fragment key={item.id}>
                                                                <Card
                                                                        key={item.id}
                                                                        title={item.title}
                                                                        description={item.description}
                                                                />
                                                        </Fragment>
                                                ))}
                                        </div>
                                </div>
                        </div>
                </section>
        )
}

const Card = ({ title, description }: { title: string; description: string }) => {
        return (
                <div className='flex gap-0.5 flex-col text-center p-5 border border-amber-200 rounded-md bg-amber-100 flex-1'>
                        <h3 className='font-semibold text-lg'>
                                {title}
                        </h3>
                        <p
                                className='text-sm'
                        >
                                {description}
                        </p>
                </div>
        )
}

const FormSection = () => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5'>
                        <div className='container relative mx-auto'>
                                <div>
                                        <h2 className='font-semibold text-2xl text-center mb-5'>
                                                {partnerWithUsContents.formTitle}
                                        </h2>
                                        <p
                                                className='text-sm text-center'
                                        >
                                                {partnerWithUsContents.formSubtitle}
                                        </p>
                                </div>
                                <div>
                                        <PartnerWithUsForm/>
                                </div>
                        </div>
                </section> 
        )
}
