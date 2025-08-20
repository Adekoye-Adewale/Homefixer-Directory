import Link from 'next/link'
import React from 'react'

export default function PriBtn( { href = '/', title = 'button name' }: { href:string; title:string } ) {
        return (
                <Link
                        href={href}
                        title={title}
                        className='py-2 px-5 text-sm font-semibold border border-solid border-black text-white rounded bg-black transition-colors duration-300 hover:bg-transparent hover:text-black'
                >
                        {title}
                </Link>
        )
}
