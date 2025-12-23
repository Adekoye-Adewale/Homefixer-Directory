import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { businessByCategorySlugQuery, businessByLocationSlugQuery, businessBySlugQuery, businessQuery } from './queries/business'
import { businessCategoryQuery } from './queries/businessCategory'
import { businessLocationQuery } from './queries/businessLocation'
import { customBusiness } from './customTypes/business'
import { customBusinessLocationType } from './customTypes/businessLocation'
import { customBusinessCategoryType } from './customTypes/businessCategory'
import { blogBySlugQuery, blogCategoryQuery, blogQuery } from './queries/blog'
import { customBlog } from './customTypes/blog'
import { customBlogCategoryType } from './customTypes/blogCategory'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const getAllBusinesses = async () => {
  const businesses = await sanityFetch<customBusiness[]>(businessQuery);
  return businesses;
}

export const getAllBusinessesCategory = async () => {
  const categories = await sanityFetch<customBusinessCategoryType[]>(businessCategoryQuery);
  return categories;
}

export const getAllBusinessesLocations = async () => {
  const locations = await sanityFetch<customBusinessLocationType[]>(businessLocationQuery);
  return locations;
}

export const getBusinessBySlug = async (slug: string) => {
  try {
    const business = await sanityFetch<customBusiness | null>(
      businessBySlugQuery,
      { slug }
    );
    return business ?? null;
  } catch (error) {
    console.error("Error fetching business by slug:", error)
    return null;
  }
}

export const getCategoryBySlug = async (slug: string) => {
  try {
    const query = `*[_type == 'businessCategory' && slug.current == $slug][0]`;
    const category = await sanityFetch<customBusinessCategoryType[]>( query,  { slug } );
    return category ?? null;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

export const getBusinessByCategorySlug = async (slug: string): Promise<customBusiness[]> => {
  try {
    const business = await sanityFetch<customBusiness[]>(businessByCategorySlugQuery, { slug } )
    return business;
  } catch (error) {
    console.error("Error fetching businesses by category slug:", error);
    return [];
  }
}

export const getLoactionBySlug = async (slug: string) => {
  try {
    const query = `*[_type == 'businessLocation' && slug.current == $slug][0]`;
    const location = await sanityFetch<customBusinessLocationType[]>(query, { slug });
    return location ?? null;
  } catch (error) {
    console.error("Error fetching location by slug:", error);
    return null;
  }
}

export const getBusinessByLocationSlug = async (slug: string): Promise<customBusiness[]> => {
  try {
    const business = await sanityFetch<customBusiness[]>( businessByLocationSlugQuery, { slug } )
    return business;
  } catch (error) {
    console.error("Error fetching businesses by location slug:", error);
    return [];
  }
}

export const getAllBlogs = async () => {
  const blog = await sanityFetch<customBlog[]>(blogQuery)
  return blog;
}

export const getBlogBySlug = async (slug: string) => {
  try {
    const blog = await sanityFetch<customBlog>(blogBySlugQuery, { slug })
    return blog
  } catch (error) {
    console.error("Error fetching blog by slug:", error)
    return null;
  }
}

export const getAllBlogsCategory = async () => {
  const categories = await sanityFetch<customBlogCategoryType[]>(blogCategoryQuery)
  return categories;
}