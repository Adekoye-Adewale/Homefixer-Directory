import { z } from "zod"
import SearchPageComponents from "@/components/pages/searchPage";
import { getBusinessGoogleData } from "@/lib/getBusinessGoogleInfo";
import { getAllBusinesses, getAllBusinessesLocations, getBusinessByLocationSlug } from "@/sanity/lib/client"
import { customBusiness } from "@/sanity/lib/customTypes/business"

const searchParamsSchema = z.object({
        name: z
                .string()
                .trim()
                .min(1, "Business name cannot be empty")
                .max(50, "Business name too long")
                .regex(/^[a-zA-Z0-9\s\-&]+$/, "Invalid characters in business name")
                .optional(),
        location: z
                .string()
                .trim()
                .max(50, "Location too long")
                .regex(/^[a-z0-9\-]+$/, "Invalid location format") // assuming slug format
                .optional(),
})

type SearchPageProps = {
        searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
        const params = await searchParams

        const parsed = searchParamsSchema.safeParse(params)

        let name: string | undefined
        let location: string | undefined

        if (parsed.success) {
                name = parsed.data.name
                location = parsed.data.location
        } else {
                console.warn("Invalid query params:", parsed.error.flatten().fieldErrors)
        }

        let businesses: customBusiness[] = []

        const allLocations = await getAllBusinessesLocations()

        if (location) {
                businesses = (await getBusinessByLocationSlug(location)) ?? []
        } else {
                businesses = await getAllBusinesses()
        }

        if (name) {
                businesses = businesses.filter((b) =>
                        b.businessName.toLowerCase().includes(name.toLowerCase())
                )
        }

        const googleInfo = await Promise.all(
                businesses.map(biz =>
                        getBusinessGoogleData(biz.businessName, biz.location?.title ?? "")
                )
        )

        return (
                <div className="mt-8">
                        <SearchPageComponents
                                name={name}
                                location={location}
                                businesses={businesses}
                                allLocations={allLocations}
                                info={googleInfo}
                        />
                </div>
        )
}