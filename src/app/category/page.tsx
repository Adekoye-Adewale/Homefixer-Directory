import CategoryPageComponent from '@/components/pages/categoryPage'
import { getAllBusinessesCategory } from '@/sanity/lib/client'
import React from 'react'

export default async function CategoryPage() {

        const allCategory = await getAllBusinessesCategory()

        return (
                <CategoryPageComponent
                        length={allCategory.length}
                        allCategory={allCategory}
                />
        )
}
