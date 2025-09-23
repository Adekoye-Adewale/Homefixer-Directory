export type Review = {
        author_name: string;
        rating: number;
        text: string;
        relative_time_description: string;
};

export type BusinessData = {
        name: string;
        formatted_address: string;
        rating: number;
        user_ratings_total: number;
        reviews?: Review[];
        geometry: { 
                location: { 
                        lat: number; 
                        lng: number 
                } 
        };
};

export async function getBusinessGoogleData(
        businessName: string,
        locationTitle: string
): Promise<BusinessData | null> {
        try {
                const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/business-info?businessName=${encodeURIComponent(
                                businessName
                        )}&locationTitle=${encodeURIComponent(locationTitle)}`,
                        {
                                cache: "force-cache",
                                next: { revalidate: 60 * 60 * 24 },
                        }
                );

                if (!res.ok) return null;

                return (await res.json()) as BusinessData;
        } catch (error) {
                console.error("Failed to fetch business data:", error);
                return null;
        }
}
