import { type SchemaTypeDefinition } from 'sanity'
import { business } from './schemas/businesses'
import { businessCategory } from './schemas/businessCategory'
import { businessLocation } from './schemas/businessLocation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    business,
    businessCategory,
    businessLocation,
  ],
}
