import React from 'react'
import BlogCategoryPage from '@/components/pages/blog/blogCategoryPage'
import { News } from '@/contents/blogs'
import { getAllBlogs, getAllBlogsCategory } from '@/sanity/lib/client'


export default async function NewsPage() {

        const posts = await getAllBlogs()
        const categories = await getAllBlogsCategory()

        const newsPosts = posts.filter(post => post.category?.slug.current === 'news')

        const featuredNewsPosts = newsPosts.filter(post => post.featured === true)

        // console.log("Posts===++===", tipsPosts)
        // console.log("FeaturedPosts===++===", featuredTipsPosts)
        
        return (
                <BlogCategoryPage 
                        {...News} 
                        posts={newsPosts}
                        categories={categories}
                        featuredBlogs={featuredNewsPosts}
                />
        )
}
