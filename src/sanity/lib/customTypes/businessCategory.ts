export type customBusinessCategoryType = {
        _id?: string
        _type?: "businessCategory"
        description?: string
        title: string
        slug?: string
        image: {
                metadata: {
                        dimensions: {
                                _type: 'sanity.imageDimensions'
                                aspectRatio: number
                                height: number
                                width: number
                        }
                        lqip: string
                }
                url: string
        } | null
        businessCount: number
};