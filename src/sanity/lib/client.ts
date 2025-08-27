import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { BusinessCategory, BusinessLocation } from '@/sanity.types'
import { businessQuery } from './queries/business'
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
  return businesses.data as customBusiness[]
}

export const getAllBusinessesCategory = async () => {
  const query = businessCategoryQuery
  const categories = await sanityFetch({ query: query })
  return categories.data as customBusinessCategoryType[]
}

export const getAllBusinessesLocations = async () => {
  const query = businessLocationQuery
  const locations = await sanityFetch({ query: query })
  return locations.data as customBusinessLocationType[]
}