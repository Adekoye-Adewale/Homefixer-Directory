import React, { Fragment } from 'react'
import { Blog, BlogListProps } from './blogTypes'
import { Badge } from '../../ui/badge'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogList({ blogs }: BlogListProps) {
        return (
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-5'>
                        {blogs.map((blog) => (
                                <Fragment key={blog.id} >
                                        <Card
                                                title={blog.title}
                                                category={blog.category}
                                                slug={blog.slug}
                                                image={blog.image}
                                        />
                                </Fragment>
                        ))}
                </div>
        )
}

const Card = ({ title, category, slug, image }: Blog) => {
        return (
                <div className='border border-gray-300 bg-gray-200 rounded-sm'>
                        <div className='relative aspect-video overflow-clip rounded-sm z-10'>
                                <Image
                                        src={image.src || `/blog-image.webp`}
                                        alt={image.alt || 'Lagos Home Fixers Blog Image'}
                                        width={image.width || 1000}
                                        height={image.height || 700}
                                        className='w-full h-auto object-cover transition-all hover:scale-105 duration-300 ease-in-out'
                                />
                                <div className='absolute top-2.5 left-2.5 z-10'>
                                        <Link
                                                href={`/blog/category/${category.slug}`}
                                                title={`View all posts in ${category.title}`}
                                        >
                                                <Badge>
                                                        {category.title}
                                                </Badge>
                                        </Link>
                                </div>
                        </div>
                        <div className='p-2.5 md:p-3'>
                                <h3 className='font-bold text-sm md:text-sm mb-1'>
                                        {title}
                                </h3>
                                <Link
                                        href={`/blog/${slug}`}
                                        title={`Read ${title}`}
                                        className='text-xs font-semibold text-blue-600 underline'>
                                        Read blog
                                </Link>
                        </div>
                </div>
        )
}