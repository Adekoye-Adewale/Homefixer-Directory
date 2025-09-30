import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
        return (
                <Link 
                        href={`/`} 
                        title={`Lagos HomeFix Logo`}
                >
                        <Image
                                src={'/lagos-homeFix-logo.svg'}
                                alt={`Lagos HomeFix Logo`}
                                title={`Lagos HomeFix Logo`}
                                width={100}
                                height={100}
                                className='w-12'
                        />
                </Link>
        )
}
