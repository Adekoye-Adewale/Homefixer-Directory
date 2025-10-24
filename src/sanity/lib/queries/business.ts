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

export const businessBySlugQuery = `*[_type == 'business' && slug.current == $slug][0]{
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

export const businessByCategorySlugQuery = `*[_type == "business" && references(*[_type == "businessCategory" && slug.current == $slug][0]._id)]{
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
    "gallery": gallery[] {
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

export const businessByLocationSlugQuery = `*[_type == "business" && references(*[_type == "businessLocation" && slug.current == $slug][0]._id)]{
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
    "gallery": gallery[] {
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