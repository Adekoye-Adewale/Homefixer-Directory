import { defineField, defineType } from "sanity";

export const business = defineType({
        name: "business",
        title: "Business",
        type: "document",
        fields: [
                defineField({
                        name: "businessName",
                        title: "Business Name",
                        type: "string",
                        validation: (rule) => rule.required(),
                }),
                defineField({
                        name: "slug",
                        title: "Slug",
                        type: "slug",
                        options: { source: 'businessName' },
                        validation: (rule) => rule.required(),
                }),
                defineField({
                        name: "businessLogo",
                        title: "Business Logo",
                        type: "image",
                        description: "Use an image with a 1:1 ratio for best display results",
                }),
                defineField({
                        name: "coverImage",
                        title: "Cover Image",
                        type: "image",
                        description: "Use an image with a 16:6 ratio for best display results",
                }),
                defineField({
                        name: "gallery",
                        title: "Gallery",
                        type: "array",
                        of: [{ type: "image" }],
                        options: {
                                layout: "grid",
                        },
                        validation: (rule) => rule.max(4),
                        description: "Upload up to 4 images. Max 4 images",
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
                                type: "businessCategory"
                        }]
                }),
                defineField({
                        name: "description",
                        title: "Description",
                        type: "text",
                }),
                defineField({
                        name: "location",
                        title: "Location",
                        type: "reference",
                        to: [{
                                type: "businessLocation"
                        }]
                }),
                defineField({
                        name: "businessAddress",
                        title: "Business Address",
                        type: "text",
                }),
                defineField({
                        name: "businessEmail",
                        title: "Business Email",
                        type: "email",
                }),
                defineField({
                        name: "businessPhoneNumber",
                        title: "Business Phone Number",
                        type: "string",
                }),
                defineField({
                        name: "businessWebsite",
                        title: "Business Website",
                        type: "url",
                }),
        ]
})