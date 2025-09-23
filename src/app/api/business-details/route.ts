import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

// cache for 30 days
const CACHE_TTL = 60 * 60 * 24 * 30

export async function GET(req: Request) {
        try {
                const { searchParams } = new URL(req.url)
                const businessName = searchParams.get("name")
                const locationTitle = searchParams.get("location")

                if (!businessName) {
                        return NextResponse.json(
                                { error: "Business name is required" }, 
                                { status: 400 }
                        )
                }

                const cacheKey = `place:${businessName}:${locationTitle || "lagos"}`
                const cached = await redis.get<string>(cacheKey)
                if (cached) {
                        return NextResponse.json(JSON.parse(cached))
                }

                const apiKey = process.env.GOOGLE_MAPS_API_KEY
                if (!apiKey) {
                        return NextResponse.json(
                                { error: "Google API key not configured" }, 
                                { status: 500 }
                        )
                }

                // Search place by business name + location.title (if available)
                const query = locationTitle
                        ? `${businessName} ${locationTitle}, Nigeria`
                        : `${businessName}, Nigeria`

                const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
                        query
                )}&key=${apiKey}`

                const searchRes = await fetch(searchUrl)
                const searchData = await searchRes.json()

                if (!searchData.results?.length) {
                        return NextResponse.json(
                                { error: "No place found" }, 
                                { status: 404 }
                        )
                }

                const placeId = searchData.results[0].place_id

                // Get place details (ratings + reviews)
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews,user_ratings_total&key=${apiKey}`

                const detailsRes = await fetch(detailsUrl)
                const detailsData = await detailsRes.json()

                if (!detailsData.result) {
                        return NextResponse.json(
                                { error: "No details found" }, 
                                { status: 404 }
                        )
                }

                const details = {
                        rating: detailsData.result.rating,
                        totalReviews: detailsData.result.user_ratings_total,
                        reviews: detailsData.result.reviews?.map((r: any) => ({
                                author: r.author_name,
                                text: r.text,
                                rating: r.rating,
                                relativeTime: r.relative_time_description,
                        })),
                }

                // Cache in Upstash
                await redis.set(cacheKey, JSON.stringify(details), { ex: CACHE_TTL })

                return NextResponse.json(details)
        } catch (err) {
                console.error("Business details API error:", err)
                return NextResponse.json({ error: "Internal server error", details: String(err) }, { status: 500 })
        }
}
