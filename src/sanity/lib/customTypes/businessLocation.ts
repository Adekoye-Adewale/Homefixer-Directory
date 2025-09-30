export type customBusinessLocationType = {
        _id?: string
        _type?: "businessLocation"
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