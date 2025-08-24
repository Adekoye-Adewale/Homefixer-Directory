import React, { Fragment } from 'react'
import Image from 'next/image'
import { connectingBizCardProps } from './homeContentTypes'
import { connectBizContents } from '@/contents/homePage'
import { MoveRight } from 'lucide-react'

export default function ConnectingBiz() {
        return (
                <section
                        className = 'py-20 md:py-32 px-2.5 md:px-5 overflow-clip bg-amber-100'
                >
                        <div className='container mx-auto grid content-end p-5 md:p-10 relative rounded overflow-hidden min-h-96'>
                                <Image
                                        src={'/lagoshomefixer-hero-img.webp'}
                                        alt={'Lagos Home Fixers'}
                                        width={1000}
                                        height={758}
                                        className='absolute inset-0 size-full object-cover brightness-80'
                                />
                                <div className='relative'>
                                        <h2
                                                className='font-bold text-3xl md:text-4xl max-w-lg text-pretty'
                                        >
                                                Connecting home owners to home fixers with ease
                                        </h2>
                                        <div className='flex flex-col md:flex-row gap-3 md:gap-5 mt-5 md:mt-8'>
                                                {connectBizContents.map( (content) => (
                                                        <Fragment key={content.titleTop}>
                                                                <Card
                                                                        {...content}
                                                                />
                                                        </Fragment>
                                                ))}
                                        </div>
                                </div>
                        </div>
                </section>
        )
}

const Card = ({ titleTop, titleBottom, description }: connectingBizCardProps ) => {
        return (
                <div className='p-5 grow rounded text-left transition-all duration-300 bg-[#EE9513] hover:bg-amber-100 hover:-translate-y-1 group'>
                        <h3
                                className='font-semibold text-lg'
                        >
                                <span>
                                        {titleTop}
                                </span><br />
                                <span>
                                        {titleBottom}
                                </span>                                
                        </h3>
                        <div className='flex gap-2 items-center justify-between'>
                                <p className='text-sm mt-1 md:mt-2'>
                                        {description}
                                </p>
                                <MoveRight
                                        className='transition-colors duration-300 group-hover:text-[#ee9513]'
                                />
                        </div>
                </div>
        )
}