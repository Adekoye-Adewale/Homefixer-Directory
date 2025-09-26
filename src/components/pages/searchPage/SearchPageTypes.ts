import { BusinessData } from "@/lib/getBusinessGoogleInfo"
import { customBusiness } from "@/sanity/lib/customTypes/business"
import { customBusinessLocationType } from "@/sanity/lib/customTypes/businessLocation"

export type SearchPageProps = {
        name?: string
        location?: string
        businesses?: customBusiness[]
        allLocations?: customBusinessLocationType[]
}

export type SearchPageBusinessListProps = {
        businesses: customBusiness[]
        info: (BusinessData | null)[]
}
