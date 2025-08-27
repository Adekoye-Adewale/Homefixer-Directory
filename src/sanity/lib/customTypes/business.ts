type Slug = {
        current: string
}

export type customBusiness = {
        _id?: string
        _type?: "business";
        businessName: string
        slug?: {
                _type: string
                current: string
        }
        businessLogo: {
                url: string
        }
        coverImage: {
                url: string
        }
        gallery?: {
                asset: {
                        url: string
                }
        }[]
        featured?: boolean
        category: {
                _id: string
                title: string
                slug: Slug
        }
        description: string
        location: {
                _id: string
                title: string
                slug: Slug
        }
        businessAddress?: string
        businessEmail?: string
        businessPhoneNumber?: string
        businessWebsite?: string | null
}