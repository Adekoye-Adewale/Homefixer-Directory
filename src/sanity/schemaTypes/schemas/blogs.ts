import { defineField, defineType } from "sanity";

export const blog = defineType({
        name: "blog",
        title: "Blog",
        type: "document",
        fields: [
                defineField({
                        name: "blogTitle",
                        title: "Blog Title",
                        type: "string",
                        validation: (rule) => rule.required(),
                }),
                defineField({
                        name: "slug",
                        title: "Slug",
                        type: "slug",
                        options: { source: 'blogTitle' },
                        validation: (rule) => rule.required(),
                }),
                defineField({
                        name: "blogImage",
                        title: "Blog Image",
                        type: "image",
                        description: "Use an image with a 16:9 ratio for best display results",
                        initialValue: {
                                asset: {
                                        _ref: "lagosHomeFixers-blog-image.webp",
                                        _type: ""
                                },
                        },
                }),
                defineField({
                        name: "featured",
                        title: "Featured",
                        type: "boolean",
                        initialValue: false,
                }),
                defineField({
                        name: "category",
                        title: "Category",
                        type: "reference",
                        to: [{
                                type: "blogCategory"
                        }]
                }),
                defineField({
                        name: "body",
                        title: "Body",
                        type: "text",
                        validation: (rule) => rule.required(),
                }),
        ]
})