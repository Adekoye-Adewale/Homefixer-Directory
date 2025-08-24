import { defineField, defineType } from "sanity";

export const businessCategory = defineType({
        name: "businessCategory",
        title: "Business Category",
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
        ]
})