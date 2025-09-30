export const businessLocationQuery = `*[_type == "businessLocation"]{
        _id,
        title,
        "slug": slug.current,
        "image": image.asset->{
                url,
                metadata { lqip, dimensions }
        },
        "businessCount": count(*[_type == "business" && references(^._id)])
}`