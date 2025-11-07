import React, { Fragment } from 'react'
import BlogList from './blogList'
import { BlogListProps, CategoriesProps } from './blogTypes'
import BlogSearch from '@/components/forms/blogSearch'
import SideBarBlogCard from './sideBarBlogCard'
import Link from 'next/link'

export default function ArchivePage({ blogs, categories }: BlogListProps & CategoriesProps) {
        return (
                <section className='flex justify-center items-center py-5 md:py-10 px-2.5 md:px-5 relative overflow-clip'>
                        <div className='container relative mx-auto'>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                        <MainSecton 
                                                blogs={blogs}
                                        />
                                        <SideWidget
                                                blogs={blogs}
                                                categories={categories}
                                        />
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

const SideWidget = ({ blogs, categories }: BlogListProps & CategoriesProps) => {
        return (
                <div className='col-span-1 border border-sm border-gray-300 rounded-sm p-5 space-y-2.5'>
                        <div className='flex flex-col gap-2.5 md:gap-5'>
                                <div>
                                        <BlogSearch blogs={blogs} />
                                </div>
                                <div className='divide-y divide-gray-300/50 space-y-3'>
                                        <RecentPosts blogs={blogs} />
                                        <Categories categories={categories} />
                                </div>
                        </div>
                </div>
        )
}

const RecentPosts = ({ blogs }: BlogListProps) => {
        return (
                <div className='pb-3'>
                        <h4 className='text-sm font-semibold text-black/90'>
                                Featured Posts
                        </h4>
                        <div className='flex flex-col mt-2.5 divide-y divide-gray-300/40 space-y-1'>
                                {blogs.slice(0, 3).map(blog => (
                                        <Fragment key={blog._id}>
                                                <SideBarBlogCard 
                                                        blog={blog}
                                                        className='pb-1'
                                                />
                                        </Fragment>
                                ))}
                        </div>
                </div>
        )
}

const Categories = ({ categories }: CategoriesProps) => {
        return (
                <div>
                        <h4 className='text-sm font-semibold text-black/90'>
                                Categories
                        </h4>
                        <div className='flex flex-col mt-2.5 divide-y divide-gray-300/40 space-y-2 text-xs font-normal text-black/80 group-hover:text-black transition-colors duration-300'>
                                {categories?.map((category) => (
                                        <Link 
                                                key={category._id} 
                                                href={`/blog/${category.slug}` || '#'}
                                                className='pb-2'
                                        >
                                                {category.title}
                                        </Link>
                                ))}
                        </div>
                </div>
        )
}
