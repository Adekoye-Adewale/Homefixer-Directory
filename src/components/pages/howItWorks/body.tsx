import React, { Fragment } from 'react'
import Image from 'next/image'
import { forBusinessesContents, forUsersContents, howItWorksContents } from '@/contents/howItWorksPage'

type cardProps = {
        id?: number
        imgSrc: string
        title: string
        description: string
}

type forSectionProps = {
        topic: string
        intro: string
        items: cardProps[]
}

export default function Body() {
        return (
                <>
                        <section className='bg-amber-100 flex justify-center items-center py-3 md:py-5 px-2.5 md:px-5'>
                                <div className='container relative mx-auto'>
                                        <p className='text-sm text-center font-semibold leading-relaxed'>
                                                {howItWorksContents.body}
                                        </p>
                                </div>
                        </section>
                        <section className='flex justify-center items-center py-5 md:py-10 px-2.5 md:px-5'>
                                <div className='container relative mx-auto'>
                                        <div className='space-y-10 '>
                                                <ForSection
                                                        topic='For Businesses'
                                                        intro={forBusinessesContents.intro}
                                                        items={forBusinessesContents.steps}
                                                />
                                                <ForSection
                                                        topic='For Users'
                                                        intro={forUsersContents.intro}
                                                        items={forUsersContents.steps}
                                                />
                                        </div>
                                </div>
                        </section>
                </>
        )
}

const ForSection = ({ topic, intro, items }: forSectionProps) => {
        return (
                <div>
                        <div className='space-y-1.5 text-center'>
                                <h2 className='font-bold text-lg'>
                                        {topic}
                                </h2>
                                <p className='text-sm font-normal leading-relaxed'>
                                        {intro}
                                </p>
                        </div>
                        <div className='flex flex-col flex-wrap justify-center md:flex-row gap-5 mt-2.5 md:mt-5'>
                                {items.map((item) => (
                                        <Fragment key={item.id} >
                                                <Card 
                                                        imgSrc={item.imgSrc}
                                                        title={item.title}
                                                        description={item.description}
                                                />
                                        </Fragment>
                                ))}
                        </div>
                        
                </div>
        )
}

const Card = ({ title, description, imgSrc }: cardProps ) => {
        return (
                <div className='p-5 rounded border-solid border flex flex-col gap-2 items-center justify-center text-center basis-[400px] grow-0 shrink-1 transition-all duration-300 bg-white hover:bg-amber-100 hover:-translate-y-1'>
                        <div>
                                <Image
                                        src={imgSrc}
                                        title={title}
                                        alt={title}
                                        width={120}
                                        height={120}
                                />
                        </div>
                        <div>
                                <h3
                                        className='font-semibold text-lg'
                                >
                                        {title}
                                </h3>
                                <p
                                        className='text-sm mt-1 md:mt-2 font-normal leading-relaxed how-it-works'
                                        dangerouslySetInnerHTML={{ __html: description }}
                                />
                        </div>
                </div>
        )
}

