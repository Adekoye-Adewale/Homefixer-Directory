import SearchPageComponents from "@/components/pages/searchPage";
import { getBusinessGoogleData } from "@/lib/getBusinessGoogleInfo";
import { getAllBusinesses, getAllBusinessesLocations, getBusinessByLocationSlug } from "@/sanity/lib/client"
import { customBusiness } from "@/sanity/lib/customTypes/business"

type SearchPageProps = {
        searchParams: {
                name?: string;
                location?: string;
        }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
        const params = await searchParams
        const { name, location } = params || {}

        let businesses: customBusiness[] = []

        const allLocations = await getAllBusinessesLocations()

        if (location) {
                businesses = await getBusinessByLocationSlug(location)
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