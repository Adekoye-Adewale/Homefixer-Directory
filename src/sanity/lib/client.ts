import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { Business, BusinessCategory, BusinessLocation } from '@/sanity.types'
import { businessByCategorySlugQuery, businessQuery } from './queries/business'
import { businessCategoryQuery } from './queries/businessCategory'
import { businessLocationQuery } from './queries/businessLocation'
import { customBusiness } from './customTypes/business'
import { customBusinessLocationType } from './customTypes/businessLocation'
import { customBusinessCategoryType } from './customTypes/businessCategory'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const getAllBusinesses = async () => {
  const query = businessQuery
  const businesses = await sanityFetch({ query: query })
  return businesses.data as customBusiness[];
}

export const getAllBusinessesCategory = async () => {
  const query = businessCategoryQuery
  const categories = await sanityFetch({ query: query })
  return categories.data as customBusinessCategoryType[];
}

export const getAllBusinessesLocations = async () => {
  const query = businessLocationQuery
  const locations = await sanityFetch({ query: query })
  return locations.data as customBusinessLocationType[];
}

export const getCategoryBySlug = async (slug: string) => {
  try {
    const query = `*[_type == 'businessCategory' && slug.current == $slug][0]`;
    const category = await sanityFetch({ query, params: { slug } });
    return category.data ?? null;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

export const getBusinessByCategorySlug = async (slug: string): Promise<customBusiness[]> => {
  try {
    const query = businessByCategorySlugQuery
    const business = await sanityFetch({ query, params: { slug } })
    return business.data ?? [];
  } catch (error) {
    console.error("Error fetching businesses by category slug:", error);
    return [];
  }
}
