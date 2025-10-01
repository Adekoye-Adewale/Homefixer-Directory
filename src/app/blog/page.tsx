import React from 'react'
import BlogPageComponent from '@/components/blog'
import { blogs } from '@/contents/blogs'

export default function page() {
        return (
                <BlogPageComponent
                        blogs={blogs}
                />
        )
}
