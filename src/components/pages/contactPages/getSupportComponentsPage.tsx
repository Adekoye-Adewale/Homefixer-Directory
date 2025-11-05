import React, { Fragment } from 'react'
import HeroSection from './heroSection'
import Link from 'next/link'
import ConnectingBiz from '../homePage/connectingBiz'
import { getSupportContents } from '@/contents/getSupport'

export default function GetSupportComponentsPage() {
        return (
                <main>
                        <HeroSection
                                imageUrl={getSupportContents.imageUrl}
                                pageTitle={getSupportContents.pageTitle}
                                pageParagraph={getSupportContents.pageParagraph}
                        />
                        <GetSupportBody />
                        <ConnectingBiz/>
                </main>
        )
}


const GetSupportBody = () => {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5'>
                        <div className='container relative mx-auto'>
                                <div className='flex gap-5 justify-between flex-col md:flex-row'>
                                        {getSupportContents.body.map((item) => (
                                                <Fragment key={item.id}>
                                                        <Card
                                                                title={item.title}
                                                                link={item.link}
                                                                linkText={item.linkText}
                                                        />     
                                                </Fragment>
                                        ))}
                                </div>
                        </div>
                </section>
        )
}

const Card = ({ title, link, linkText }: { title: string; link: string; linkText: string }) => {
        return (
                <div className='flex gap-0.5 flex-col text-center p-5 border border-amber-200 rounded-md bg-amber-100 flex-1'>
                        <h3 className='font-semibold text-lg'>
                                {title}
                        </h3>
                        <Link
                                href={link}
                                className='text-sm hover:text-[#503204] transition-colors duration-300'
                        >
                                {linkText}
                        </Link>
                </div>
        )
}