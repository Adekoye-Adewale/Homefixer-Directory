import React from 'react'
import Link from 'next/link'
import PlusIcon from '@/icons/plus';

export default function SubmitYourBizBtn() {
        return (
                <Link
                        href={'/submit-your-business'}
                        title={'Submit your business'}
                        className='py-2 px-5 flex gap-1 items-center justify-center text-sm font-semibold border border-solid border-black rounded bg-transparent transition-colors duration-300 hover:bg-black hover:text-white'
                >
                        <PlusIcon/>
                        <span>
                                Submit your business
                        </span>
                </Link>
        )
}