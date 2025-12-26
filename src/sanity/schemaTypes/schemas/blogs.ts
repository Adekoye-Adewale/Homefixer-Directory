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
                        options: { hotspot: true },
                        description: "Use an image with a 16:9 ratio for best display results",
                        fields: [
                                {
                                        name: "alt",
                                        title: "Alt text",
                                        type: "string",
                                        description: "Describe the image for SEO and accessibility",
                                        validation: (rule) => rule.required(),
                                },
                                {
                                        name: "caption",
                                        title: "Caption",
                                        type: "string",
                                },
                        ],
                }),
                defineField({
                        name: "featured",
                        title: "Featured",
                        type: "boolean",
                        initialValue: false,
                }),
                defineField({
                        name: "publishedAt",
                        title: "Published at",
                        type: "datetime",
                        initialValue: () => new Date().toISOString(),
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
                        type: "array",
                        validation: (rule) => rule.required(),
                        of: [
                                {
                                        type: "block",
                                        styles: [
                                                { title: "Normal", value: "normal" },
                                                { title: "H1", value: "h1" },
                                                { title: "H2", value: "h2" },
                                                { title: "H3", value: "h3" },
                                                { title: "H4", value: "h4" },
                                                { title: "Quote", value: "blockquote" },
                                        ],
                                        lists: [
                                                { title: "Bullet", value: "bullet" },
                                                { title: "Numbered", value: "number" },
                                        ],
                                        marks: {
                                                decorators: [
                                                        { title: "Bold", value: "strong" },
                                                        { title: "Italic", value: "em" },
                                                        { title: "Underline", value: "underline" },
                                                ],
                                                annotations: [
                                                        {
                                                                name: "link",
                                                                type: "object",
                                                                title: "Link",
                                                                fields: [
                                                                        {
                                                                                name: "href",
                                                                                type: "url",
                                                                                title: "URL",
                                                                        },
                                                                ],
                                                        },
                                                ],
                                        },
                                },
                                {
                                        type: "image",
                                        options: { hotspot: true },
                                        fields: [
                                                {
                                                        name: 'alt',
                                                        type: 'string',
                                                        title: 'Alt text',
                                                        description: 'Describe the image for SEO and accessibility',
                                                },
                                                {
                                                        name: 'caption',
                                                        type: 'string',
                                                        title: 'Caption',
                                                },
                                        ],
                                },
                        ],
                }),
                defineField({
                        name: "source",
                        title: "Source",
                        type: "string",
                }),
                defineField({
                        name: "sourceLink",
                        title: "Source Link",
                        type: "url",
                }),
        ]
})