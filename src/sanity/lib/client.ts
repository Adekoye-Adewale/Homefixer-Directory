import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { Business } from '@/sanity.types'
import { businessQuery } from './queries/business'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const getAllBusinesses = async () => {
  const query = businessQuery
  const businesses = await sanityFetch({ query: query })
  return businesses.data as Business[]
}