import Image from 'next/image'
import Link from 'next/link'
import SubmitYourBizBtn from '../buttons/submitYourBizBtn'
import MobileMenu from './mobileMenu'
import DesktopMenu from './desktopMenu'

export default function HeaderNav() {
        return (
                <header className='py-2.5 px-2.5 md:px-5 bg-amber-100 sticky top-0 left-0 z-50'>
                        <div className='container mx-auto flex justify-between items-center gap-2 '>
                                <div>
                                        <Link href={`/`} title={`Lagos HomeFix Logo`}>
                                                <Image 
                                                        src={'/lagos-homeFix-logo.svg'} 
                                                        alt={`Lagos HomeFix Logo`} 
                                                        title={`Lagos HomeFix Logo`} 
                                                        width={100} 
                                                        height={100}
                                                        className='w-12'
                                                />
                                        </Link>
                                </div>
                                <div className='md:flex hidden'>
                                        <DesktopMenu/>
                                </div>
                                <div className='flex gap-2 items-center justify-between'>
                                        <SubmitYourBizBtn/>
                                        <div className='cursor-pointer flex md:hidden'>
                                                <MobileMenu/>
                                        </div>
                                </div>
                        </div>
                </header>
        )
}