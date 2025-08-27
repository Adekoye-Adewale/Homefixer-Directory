export const businessQuery = `*[_type == "business"]{
        _id,
        businessName,
        businessEmail,
        businessPhoneNumber,
        businessAddress,
        businessWebsite,
        "businessLogo": businessLogo.asset->{
                url
        },
        "coverImage": coverImage.asset->{
                url
        },
        "gallery": gallery[]{
                asset->{
                        url
                }
        },
        description,
        featured,
        slug,
        category->{
                _id,
                title,
                slug
        },
        location->{
                _id,
                title,
                slug
        }
}`