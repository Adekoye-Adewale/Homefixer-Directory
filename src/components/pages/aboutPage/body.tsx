import { aboutPageBody } from '@/contents/aboutPage'
import React from 'react'

export default function AboutBody() {
        return (
                <section className='flex justify-center items-center py-5 md:py-10 px-2.5 md:px-5 relative overflow-clip'>
                        <div className='container relative mx-auto'>
                                <div className='py-5'>
                                        <Paragraph text={aboutPageBody.bodyOne} />
                                        <Heading text={aboutPageBody.headingTwo} />
                                        <Paragraph text={aboutPageBody.bodyTwo}/>
                                        <Heading text={aboutPageBody.headingThree}/>
                                        <Paragraph text={aboutPageBody.bodyThree}/>
                                        <Heading text={aboutPageBody.headingFour}/>
                                        <Paragraph text={aboutPageBody.bodyFour}/>
                                </div>
                        </div>
                </section>
        )
}

const Heading = ({ text }: { text: string }) => {
        return (
                <h3 className='text-2xl md:text-3xl font-semibold my-2.5'>
                        {text}
                </h3>
        )
}

const Paragraph = ({ text }: { text: string }) => {
        return (
                <p className='text-sm font-normal leading-relaxed'>
                        {text}
                </p>
        )
}
