import { redis } from "@/lib/redis"

const apiKey = process.env.GOOGLE_MAPS_API_KEY!;

export async function GET(req: Request) {
        const { searchParams } = new URL(req.url);
        const businessName = searchParams.get("businessName");
        const locationTitle = searchParams.get("locationTitle");

        if (!businessName || !locationTitle) {
                return new Response(JSON.stringify({ error: "Missing params" }), { status: 400 });
        }

        // Cache key
        const cacheKey = `business-info:${businessName}:${locationTitle}`;
        const cached = await redis.get(cacheKey);
        if (cached) {
                return new Response(JSON.stringify(cached), { status: 200 });
        }

        try {
                // Get lat/lng from Geocoding API
                const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        locationTitle
                )}&key=${apiKey}`;

                const geoRes = await fetch(geoUrl);
                const geoData = await geoRes.json();

                if (!geoData.results?.length) {
                        return new Response(JSON.stringify({ error: "Location not found" }), { status: 404 });
                }

                const { lat, lng } = geoData.results[0].geometry.location;

                // Use Places API with lat/lng bias
                const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
                        businessName
                )}&location=${lat},${lng}&radius=5000&key=${apiKey}`;

                const searchRes = await fetch(searchUrl);
                const searchData = await searchRes.json();

                if (!searchData.results?.length) {
                        return new Response(JSON.stringify({ error: "Business not found" }), { status: 404 });
                }

                const place = searchData.results[0];

                // Get details (ratings + reviews)
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id
                        }&fields=name,rating,user_ratings_total,reviews,formatted_address,geometry&key=${apiKey}`;

                const detailsRes = await fetch(detailsUrl);
                const detailsData = await detailsRes.json();

                console.log("Fetched from API:", detailsData);

                // Save in Upstash KV
                await redis.set(cacheKey, detailsData.result, { ex: 60 * 60 * 24 });

                return new Response(JSON.stringify(detailsData.result), { status: 200 });
        } catch (err) {
                console.error(err);
                return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 });
        }
}
