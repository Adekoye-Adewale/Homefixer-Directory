export type BusinessCardProps = {
        coverImgUrl: string
        logoUrl: string
        title: string
        description: string
        category: string
        categorySlug: string
        location: string
        locationSlug: string
        slug: string
        businessWebsite: string
}

export type BizContentCardProps = {
        _id: string
        coverImage?: {
                url: string
        }
        businessLogo: string
        businessName: string
        businessWebsite: string
        description: string
        category: {
                _id: string
                title: string
        }
        slug: {
                _type: string
                current: string
        }
        location: {
                _id: string
                title: string
        }
}