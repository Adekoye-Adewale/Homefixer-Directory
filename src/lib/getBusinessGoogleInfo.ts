export type Review = {
        author_name: string;
        rating: number;
        text: string;
        relative_time_description: string;
};

export type BusinessData = {
        name: string;
        formatted_address: string;
        formatted_phone_number?: string;
        international_phone_number?: string;
        rating: number;
        user_ratings_total: number;
        reviews?: Review[];
        geometry: { 
                location: { 
                        lat: number; 
                        lng: number 
                } 
        };
        opening_hours: {
                open_now: boolean;
                weekday_text: string[];
        };
        url?: string;
        website: string;
        photos?: GooglePlacePhoto[];
};

export type GooglePlacePhoto = {
        height: number;
        width: number;
        photo_reference: string;
        html_attributions: string[];
};

/**
 * Fetch business data using your internal API routes.
 * - Always fetches coordinates from `/api/geocode` first (more accurate).
 * - Then calls `/api/business-info` for details.
 */

export async function getBusinessGoogleData(
        businessName: string,
        businessAddress: string
): Promise<BusinessData | null> {
        try {
                const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

                const geoRes = await fetch(
                        `${baseURL}/api/geocode?address=${encodeURIComponent(
                                businessAddress
                        )}`,
                        {
                                cache: "force-cache",
                                next: { revalidate: 60 * 60 * 24 },
                        }
                );

                if (!geoRes.ok) {
                        console.error("Geocode API error:", await geoRes.text());
                        return null;
                }

                const geoData = await geoRes.json();
                const { lat, lon } = geoData;

                const bizRes = await fetch(
                        `${baseURL}/api/business-info?businessName=${encodeURIComponent(
                                businessName
                        )}&locationTitle=${encodeURIComponent(businessAddress)}`,
                        {
                                cache: "force-cache",
                                next: { revalidate: 60 * 60 * 24 },
                        }
                );

                if (!bizRes.ok) {
                        console.error("Business-info API error:", await bizRes.text());
                        return null;
                }

                const bizData = (await bizRes.json()) as BusinessData;

                return {
                        ...bizData,
                        geometry: {
                                location: {
                                        lat,
                                        lng: lon,
                                },
                        },
                };
        } catch (error) {
                console.error("Failed to fetch business data:", error);
                return null;
        }
}
