import { PortableTextValue } from "@/components/pages/blog/types";

type Slug = {
        current: string
}

export type customBlog = {
        _id?: string
        _type?: "blog";
        blogTitle: string
        slug?: {
                _type: string
                current: string
        }
        blogImage: {
                url: string
        }
        featured?: boolean
        category?: {
                _id: string
                title: string
                slug: Slug
        }
        body: PortableTextValue
        source?: string
        sourceLink?: string
}
