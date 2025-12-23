import React, { Fragment } from 'react'
import { PortableTextValue, Blog, BlogListProps } from './types'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from '@/lib/RichTextComponents'
import { customBlog } from '@/sanity/lib/customTypes/blog'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import ShareButton from '@/components/layouts/shareButton'

type BlogProps = {
        blog: customBlog
        relatedPosts: BlogListProps['blogs']
}

type HeroSectionProps = {
        blogTitle: string
        blogImage: { url: string }
        category?: string
        categorySlug: string
        featured: boolean
        source?: string
        sourceLink: string
}

interface BlogContentProps {
        body?: PortableTextValue
}

export default function SingleBlogPageComponents({ blog, relatedPosts }: BlogProps) {
        return (
                <main>
                        <HeroSection 
                                blogTitle={blog.blogTitle}
                                blogImage={blog.blogImage}
                                category={blog.category?.title}
                                categorySlug={blog.category ? `/blog/${blog.category.slug.current}` : '/blog'}
                                featured={!!blog.featured}
                                source={blog.source}
                                sourceLink={blog.sourceLink || '#'}
                        />
                        <BlogBody body={blog.body} />
                        <RelatedPosts
                                blogs={relatedPosts}
                        />
                </main>
        )
}

const HeroSection = ({ blogTitle, blogImage, category, categorySlug, featured, source, sourceLink }: HeroSectionProps ) => {
        return (
                <section className='flex justify-center items-center py-10 md:py-20 px-2.5 md:px-5 relative overflow-clip z-[1]'>
                        <Image 
                                src={blogImage.url} 
                                alt={'Lagos Home Fixers'} 
                                width={1000} 
                                height={758}
                                className='absolute inset-0 size-full object-cover'
                        />
                        <div className='absolute inset-0 size-full bg-black/80'></div>
                        <div className='container relative mx-auto'>
                                <div className='space-y-20 md:space-y-30'>
                                        <div className='flex justify-between gap-2.5'>
                                                {category ? (<Link 
                                                        href={categorySlug} 
                                                >
                                                        <Badge 
                                                                variant="outline"
                                                                className="border-[#EE9513]/80 text-[#EE9513] hover:text-white/90 hover:border-white/90 transition-all duration-300"
                                                        >
                                                                <PingAnimation/> {category}
                                                        </Badge>
                                                </Link>) : ''}
                                                <div>
                                                         {featured && <Badge
                                                                        variant="outline"
                                                                        className="border-[#EE9513]/80 text-[#EE9513] hover:text-white/90 hover:border-white/90 transition-all duration-300"
                                                                >
                                                                        Featured
                                                                </Badge>
                                                        }
                                                </div>
                                        </div>
                                        <div className='space-y-2.5 md:space-y-5'>
                                                <div className='text-left text-pretty'>
                                                        <h1 className='font-bold text-3xl md:text-5xl text-white'>
                                                                {blogTitle}
                                                        </h1>
                                                </div>
                                                <div className='flex justify-between items-end'>
                                                        <ShareButton/>
                                                        <div>
                                                                <Link
                                                                        href={sourceLink}
                                                                        target='_blank'
                                                                        className='text-white/60 text-xs'
                                                                >
                                                                        Source: {source}
                                                                </Link>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </section>
        )
}

const BlogBody = ({ body }: BlogContentProps) => {
        return (
                <div className='py-5 md:py-10 px-2.5 md:px-5'>
                        <article className='container relative mx-auto'>
                                <PortableText 
                                        value={body || []} 
                                        components={RichTextComponents} 
                                />
                        </article>
                </div>
        )
}

const PingAnimation = () => (
        <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-xs bg-[#EE9513] opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-xs bg-amber-600"></span>
        </span>
)

const RelatedPosts = ({ blogs }: BlogListProps) => {
        return (
                <section className='flex justify-center items-center py-10 md:py-20 px-2.5 md:px-5 bg-amber-200 overflow-clip'>
                        <div className='container mx-auto'>
                                <h3 className='text-2xl md:text-3xl font-semibold mb-2.5 md:mb-5'>
                                        Related Posts
                                </h3>
                                <div className='grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-5'>
                                        {blogs.map((blog) => (
                                                <Fragment key={blog._id} >
                                                        <Card
                                                                title={blog.blogTitle}
                                                                category={blog.category}
                                                                slug={blog.slug?.current || ''}
                                                                image={blog.blogImage.url}
                                                        />
                                                </Fragment>
                                        ))}
                                </div>
                        </div>
                </section>
        )
}

const Card = ({ title, category, slug, image }: Blog) => {
        return (
                <div className='border border-amber-400 bg-white/50 rounded-sm overflow-hidden'>
                        <div className='relative aspect-video overflow-clip rounded-sm z-10'>
                                <Image
                                        src={image || `/blog-image.webp`}
                                        alt={title || 'Lagos Home Fixers Blog Image'}
                                        width={1000}
                                        height={700}
                                        className='w-full h-auto object-cover transition-all hover:scale-105 duration-300 ease-in-out'
                                />
                                <div className='absolute top-2.5 left-2.5 z-10'>
                                        <Link
                                                href={`/blog/${category?.slug.current}`}
                                                title={`View all posts in ${category?.title}`}
                                        >
                                                <Badge>
                                                        {category?.title || 'Uncategorized'}
                                                </Badge>
                                        </Link>
                                </div>
                        </div>
                        <div className='p-2.5 md:p-3 bg-white '>
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