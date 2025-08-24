import { defineField, defineType } from "sanity";

export const businessLocation = defineType({
        name: "businessLocation",
        title: "Business Location",
        type: "document",
        fields: [
                defineField({
                        name: "title",
                        title: "Title",
                        type: "string",
                        validation: (rule) => rule.required(),
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