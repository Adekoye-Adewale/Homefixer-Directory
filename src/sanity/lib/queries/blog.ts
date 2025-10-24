export const blogQuery = `*[_type == "blog"]{
        _id,
        blogTitle,
        "blogImage": blogImage.asset->{
                url
        },
        body[],
        featured,
        slug,
        category->{
                _id,
                title,
                slug
        },
        source,
        sourceLink,
}`

export const blogBySlugQuery = `*[_type == 'blog' && slug.current == $slug][0]{
        _id,
        blogTitle,
        "blogImage": blogImage.asset->{
                url
        },
        body[],
        featured,
        slug,
        category->{
                _id,
                title,
                slug
        },
        source,
        sourceLink,
}`
