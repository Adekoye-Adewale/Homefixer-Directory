"use client"
import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import {
        NavigationMenu,
        NavigationMenuContent,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
        NavigationMenuTrigger,
        navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { contactMenuItems, exploreMenuItems } from '@/contents/menu'
import { MenuLink } from './menuTypes'

type MenuItemProps = {
        title: string
        menuItems: MenuLink[]
}

export default function DesktopMenu() {
        return (
                <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                                <HomeMenu/>
                                <MenuItem 
                                        title={"Explore"} 
                                        menuItems={exploreMenuItems}
                                />
                                <MenuItem 
                                        title={"Contact"} 
                                        menuItems={contactMenuItems}
                                />
                                <NavigationMenuItem>
                                        <NavigationMenuLink 
                                                asChild 
                                                className={`${navigationMenuTriggerStyle()} bg-transparent`}>
                                                <Link 
                                                        href="/blog"
                                                >
                                                        Blog
                                                </Link>
                                        </NavigationMenuLink>
                                </NavigationMenuItem>
                        </NavigationMenuList>
                </NavigationMenu>
        )
}

const HomeMenu = () => {
        return (
                <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent shadow-none">
                                Who we are
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                        <Link
                                                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                                href="/"
                                                        >
                                                                <Image 
                                                                        src={`/lagos-homeFix-logo.svg`} 
                                                                        alt={`Lagos HomeFix Logo`}
                                                                        height={50} 
                                                                        width={50}
                                                                />
                                                                <div className="mt-4 mb-2 text-lg font-medium">
                                                                        Home page
                                                                </div>
                                                        </Link>
                                                </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/about-lagos-home-fix" title="About us">
                                                Lagos home fix is the number listing platform for home fixers in Lagos.
                                        </ListItem>
                                        <ListItem href="/how-it-works" title="How it works">
                                                We bring home owners and home fixers together.
                                        </ListItem>
                                        <ListItem href="/terms-and-conditions" title="Terms and conditions">
                                                Read our terms and conditions to understand the platform guidelines properly.
                                        </ListItem>
                                </ul>
                        </NavigationMenuContent>
                </NavigationMenuItem>
        )
}

const MenuItem = ({ title, menuItems }: MenuItemProps) => {
        return (
                <NavigationMenuItem>
                        <NavigationMenuTrigger 
                                className="bg-transparent hover:bg-transparent focus:bg-transparent shadow-none"
                        >
                                {title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                                <ul className="grid w-[300px] gap-2 text-black">
                                        {menuItems.map((menu) => (
                                                <li>
                                                        <NavigationMenuLink 
                                                                key={menu.title} 
                                                                asChild 
                                                        >
                                                                <Link
                                                                        href={menu.href}
                                                                >
                                                                        {menu.title}
                                                                </Link>
                                                        </NavigationMenuLink>
                                                </li>
                                        ))}
                                </ul>
                        </NavigationMenuContent>
                </NavigationMenuItem>
        )
}

const ListItem = ({
        title,
        children,
        href,
        ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) => {
        return (
                <li {...props}>
                        <NavigationMenuLink asChild>
                                <Link href={href}>
                                        <div className="text-sm leading-none font-medium">{title}</div>
                                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                {children}
                                        </p>
                                </Link>
                        </NavigationMenuLink>
                </li>
        )
}