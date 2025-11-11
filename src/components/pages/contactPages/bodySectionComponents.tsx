import React from 'react'

export default function BodySectionComponents({ children }: { children: React.ReactNode }) {
        return (
                <section className='flex justify-center items-center py-20 md:py-24 px-2.5 md:px-5'>
                        <div className='container relative mx-auto'>
                                <div className='max-w-4xl mx-auto border border-gray-300 rounded-md p-5 md:p-10 shadow-lg'>
                                        {children}
                                </div>
                        </div>
                </section>
        )
}
