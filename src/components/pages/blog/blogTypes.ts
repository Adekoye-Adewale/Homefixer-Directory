import { customBlog } from "@/sanity/lib/customTypes/blog"
import { customBlogCategoryType } from "@/sanity/lib/customTypes/blogCategory"

// export type Blog = {
//         id?: number
//         title: string
//         category: {
//                 title: string
//                 slug: string
//         }
//         slug: string
//         image: {
//                 src: string
//                 alt: string
//                 width: number
//                 height: number
//         }
//         body?: string
// }

export type BlogListProps = {
        blogs: customBlog[]
}

export type CategoriesProps = {
        categories?: customBlogCategoryType[]
}
