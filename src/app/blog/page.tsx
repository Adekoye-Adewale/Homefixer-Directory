import React from 'react'
import BlogPageComponent from '@/components/pages/blog'
import { blogs } from '@/contents/blogs'

export default function page() {
        return (
                <BlogPageComponent
                        blogs={blogs}
                />
        )
}
