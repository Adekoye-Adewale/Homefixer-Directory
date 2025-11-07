import React from 'react'
import BlogCategoryPage from '@/components/pages/blog/blogCategoryPage'
import { Tips } from '@/contents/blogs'
import { getAllBlogs, getAllBlogsCategory } from '@/sanity/lib/client'

export default async function TipsPage() {

        const posts = await getAllBlogs()
        const categories = await getAllBlogsCategory()

        const tipsPosts = posts.filter(post => post.category?.slug.current === 'tips')

        const featuredTipsPosts = tipsPosts.filter(post => post.featured === true)

        // console.log("Posts===++===", tipsPosts)
        // console.log("FeaturedPosts===++===", featuredTipsPosts)

        return (
                <>
                        <BlogCategoryPage 
                                {...Tips} 
                                posts={tipsPosts}
                                categories={categories}
                                featuredBlogs={featuredTipsPosts}
                        />
                </>
        )
}
