import React from 'react'
import Link from 'next/link'

export default function SecBtn({ href = '/', title = 'button name' }: { href: string; title: string }) {
        return (
                <Link
                        href={href}
                        title={title}                        
                        className='py-2 px-5 text-sm font-semibold border border-solid border-black rounded bg-transparent transition-colors duration-300 hover:bg-black hover:text-white'
                >
                        {title}
                </Link>
        )
}