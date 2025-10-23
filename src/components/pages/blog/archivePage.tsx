import React from 'react'
import BlogList from './blogList'
import { BlogListProps } from './blogTypes'

export default function ArchivePage({ blogs }: BlogListProps) {
        return (
                <section className='flex justify-center items-center py-5 md:py-10 px-2.5 md:px-5 relative overflow-clip'>
                        <div className='container relative mx-auto'>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                        <MainSecton 
                                                blogs={blogs}
                                        />
                                        <SideWidget />
                                </div>
                        </div>
                </section>
        )
}

const MainSecton = ({ blogs }: BlogListProps) => {
        return (
                <div className= 'col-span-1 md:col-span-2 border border-sm border-gray-300 rounded-sm p-5'>
                        <BlogList 
                                blogs={blogs}
                        />
                </div>
        )
}

const SideWidget = () => {
        return (
                <div className='col-span-1 border border-sm border-gray-300 rounded-sm p-5 space-y-2.5'>
                        <div className='divide-y divide-gray-300/50'>
                                <div>
                                        Search
                                </div>
                                <div>
                                        Recent posts
                                </div>
                                <div>
                                        Categories
                                </div>
                        </div>
                </div>
        )
}