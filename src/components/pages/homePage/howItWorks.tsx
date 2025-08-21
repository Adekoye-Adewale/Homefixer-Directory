import Image from 'next/image'
import React, { Fragment } from 'react'
import { cardProps } from './homeContentTypes'
import { howItWorksContents } from '@/contents/homePage'

export default function HowItWorks() {
        return (
                <section
                        className='py-20 md:py-32 px-2.5 md:px-5 relative overflow-clip'
                >
                        <div className='container mx-auto'>
                                <div className='text-center'>
                                        <h2
                                                className='text-center font-bold text-3xl md:text-4xl'
                                        >
                                                How it Works
                                        </h2>
                                        <p
                                                className='text-sm mt-2 md:mt-2.5'
                                        >
                                                Bringing local business and community members together.
                                        </p>
                                </div>
                                <div 
                                        className='flex flex-col md:flex-row gap-5 mt-5 md:mt-8'
                                >
                                        {howItWorksContents.map(( content ) => (
                                                <Fragment key={content.title}>
                                                        <Card
                                                                {...content}
                                                        />
                                                </Fragment>
                                        ))}
                                </div>
                        </div>
                </section>
        )
}

const Card = ({ title, description, imgSrc }: cardProps ) => {
        return (
                <div className='p-5 rounded border-solid border flex flex-col gap-2 items-center text-center transition-all duration-300 bg-white hover:bg-amber-100 hover:-translate-y-1'>
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
                                <p className='text-sm mt-1 md:mt-2'>
                                        {description}
                                </p>
                        </div>
                </div>
        )
}
