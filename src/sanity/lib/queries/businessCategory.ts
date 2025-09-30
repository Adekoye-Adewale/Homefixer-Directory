export const businessCategoryQuery = `*[_type == "businessCategory"]{
        _id,
        title,
        description,
        "slug": slug.current,
        "image": image.asset->{
                url,
                metadata { lqip, dimensions }
        },
        "businessCount": count(*[_type == "business" && references(^._id)])
}`