import React from 'react'
import Link from 'next/link'
import Logo from '../layouts/logo'
import { footerCompanyLinks, footerQuickLinks } from '@/contents/footer';

type FooterLinkProps = {
        topic: string;
        links: {
                id: string;
                slug: string;
                title: string;
        }[];
}

export default function SiteFooter() {
        return (
                <footer className='bg-[#111111]'>
                        <MainFooter/>
                        <CopyRight />
                </footer>
        )
}

const MainFooter = () => {
        return (
                <div className='pt-10 pb-2.5 px-2.5 md:px-5 text-[#777777]'>
                        <div className='container mx-auto mb-5 grid grid-cols-2 md:grid-cols-3 gap-5 text-xs'>
                                <div className='col-span-2 md:col-span-1'>
                                        <Logo/>
                                        <span className='block text-white/80 font-semibold uppercase mt-2'>
                                                Explore. Connect. Request.
                                        </span>
                                        <p className='text-[#777777] font-normal text-xs mt-1.5 leading-4'>
                                                Lagos Home Fixers is your go-to platform for finding trusted home service providers in Lagos. Whether you need repairs, renovations, or gardening services, we&apos;ve got you covered with a wide range of professionals ready to assist you.
                                        </p>
                                </div>
                                <div className='col-span-1'>
                                        <FooterLinks
                                                topic='Company'
                                                links={footerCompanyLinks}
                                        />
                                </div>
                                <div className='col-span-1'>
                                        <FooterLinks
                                                topic='Quick Links'
                                                links={footerQuickLinks}
                                        />
                                </div>
                        </div>
                </div>
        )
}

const CopyRight = () => {

        const currentYear = new Date().getFullYear();

        return (
                <div className='bg-black py-2.5 px-2.5 md:px-5 text-[#777777]'>
                        <div className='container mx-auto flex flex-col md:flex-row-reverse gap-2 items-center justify-between text-xs'>
                                <div className='flex gap-2 font-semibold'>
                                        <Link 
                                                href='/terms'
                                                title='Terms and Conditions'
                                                className='hover:text-white/70 transition-colors duration-300 ease-in-out'
                                        >
                                                Terms
                                        </Link>
                                        <Link 
                                                href='/privacy'
                                                title='Privacy Policy'
                                                className='hover:text-white/70 transition-colors duration-300 ease-in-out'
                                        >
                                                Privacy
                                        </Link>
                                        <Link 
                                                href='/support'
                                                title='Contact Support'
                                                className='hover:text-white/70 transition-colors duration-300 ease-in-out'
                                        >
                                                Support
                                        </Link>
                                </div>
                                <div>
                                        <span>
                                                &copy;{currentYear} <Link 
                                                        href='/' 
                                                        className='hover:text-white/70 transition-colors duration-300 ease-in-out'
                                                >
                                                         Lagos Home Fixers
                                                </Link> - All rights reserved.
                                        </span>
                                </div>
                        </div>
                        
                </div>
        )
}

const FooterLinks = ({ topic, links }: FooterLinkProps ) => {
        return (
                <div>
                        <h3 className='text-white/80 text-xs font-semibold uppercase'>
                                {topic}
                        </h3>
                        <div className='mt-1.5 flex flex-col gap-1'>
                                {links.map((link) => (
                                        <Link 
                                                key={link.id} 
                                                href={link.slug}
                                                title={link.title}
                                                className='block mt-1 text-xs text-[#777777] hover:text-white/70 transition-colors duration-300 ease-in-out'
                                        >
                                                {link.title}
                                        </Link>
                                ))}
                        </div>
                </div>
        )
}