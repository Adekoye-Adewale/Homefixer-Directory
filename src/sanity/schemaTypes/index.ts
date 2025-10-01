import { type SchemaTypeDefinition } from 'sanity'
import { business } from './schemas/businesses'
import { businessCategory } from './schemas/businessCategory'
import { businessLocation } from './schemas/businessLocation'
import { blogCategory } from './schemas/blogCategory'
import { blog } from './schemas/blogs'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    business,
    businessCategory,
    businessLocation,
    blog,
    blogCategory,
  ],
}
