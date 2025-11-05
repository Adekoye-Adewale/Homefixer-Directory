import { customBlog } from "@/sanity/lib/customTypes/blog"

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