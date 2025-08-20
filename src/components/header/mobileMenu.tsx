import React from 'react'
import Link from 'next/link'
import {
        Sheet,
        SheetClose,
        SheetContent,
        SheetDescription,
        SheetFooter,
        SheetHeader,
        SheetTitle,
        SheetTrigger,
} from "@/components/ui/sheet"
import {
        Accordion,
        AccordionContent,
        AccordionItem,
        AccordionTrigger,
} from "@/components/ui/accordion"
import { MenuIcon } from 'lucide-react'
import { MenuLink } from './menuTypes'
import { mobileMenuNavLists } from '@/contents/menu'
import SubmitYourBizBtn from '../buttons/submitYourBizBtn'

type NavProps = {
        value: string
        title: string
        MenuItems: MenuLink[]
}

export default function MobileMenu() {
        return (
                <Sheet>
                        <SheetTrigger asChild>
                                <MenuIcon/>
                        </SheetTrigger>
                        <SheetContent>
                                <MenuAccordion/>
                        </SheetContent>
                </Sheet>
        )
}

const MenuAccordion = () => {
        return (
                <div className='flex flex-col h-full justify-between py-10 px-5 overflow-y-auto'>
                        <div>
                                <Accordion
                                        type='single'
                                        collapsible
                                        className='w-full'
                                        defaultValue='item-1'
                                >
                                        {mobileMenuNavLists.map((list) => (
                                        <Navs 
                                                        value={list.value}
                                                        title={list.title}
                                                        MenuItems={list.MenuItem}
                                        /> 
                                        ))}  
                                </Accordion>
                                <SheetClose asChild>
                                        <Link
                                                href="/blog"
                                                className='font-bold text-sm hover:underline'
                                        >
                                                Blog
                                        </Link>
                                </SheetClose>                                
                        </div>
                        <SheetFooter>
                                <SheetClose asChild>
                                        <SubmitYourBizBtn/>
                                </SheetClose>
                        </SheetFooter>
                        
                </div>
        )
}

const Navs = ({ value, title, MenuItems }: NavProps) => {
        return (
                <AccordionItem value={value}>
                        <AccordionTrigger className='font-bold'>
                                {title}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                {MenuItems.map((menu) => (
                                        <SheetClose asChild>
                                                <Link 
                                                        key={menu.href} 
                                                        href={menu.href}
                                                        className='text-sm'
                                                >
                                                        {menu.title}
                                                </Link>
                                        </SheetClose>                                        
                                ))}
                        </AccordionContent>
                </AccordionItem>
        )
}