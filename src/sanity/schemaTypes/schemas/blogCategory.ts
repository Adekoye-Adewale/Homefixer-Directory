import { defineField, defineType } from "sanity";

export const blogCategory = defineType({
        name: "blogCategory",
        title: "Blog Category",
        type: "document",
        fields: [
                defineField({
                        name: "title",
                        title: "Title",
                        type: "string",
                        validation: (rule) => rule.required(),
                }),
                defineField({
                        name: "description",
                        title: "Description",
                        type: "text",
                }),
                defineField({
                        name: "slug",
                        title: "Slug",
                        type: "slug",
                        options: { source: 'title' },
                        validation: (rule) => rule.required(),
                }),
                defineField({
                        name: "image",
                        title: "Image",
                        type: "image",
                }),
                defineField({
                        name: "parent",
                        title: "Parent Category",
                        type: "reference",
                        to: [{ type: "blogCategory" }],
                        description: "Select parent category if this is a sub-category",
                }),
        ]
})