import { customBlog } from "@/sanity/lib/customTypes/blog"

export type Slug = {
        current: string
}

export type Blog = {
        id?: number
        title: string
        category?: {
                _id: string
                title: string
                slug: Slug
        }
        slug: string
        image: string
        body?: string
}

export type BlogListProps = {
        blogs: customBlog[]
}

export type BlogCategory = {
        _id: string
        title: string
        slug: Slug
}

export type BlogImage = {
        url: string
}

export type PortableTextChild = {
        _key: string
        _type: 'span'
        marks: string[]
        text: string
}

export type PortableTextBlock = {
        _key: string
        _type: 'block'
        children: PortableTextChild[]
        markDefs?: Array<{
                _key: string
                _type: string
                href?: string
        }>
        style?: string
}

export type PortableTextValue = PortableTextBlock[]

