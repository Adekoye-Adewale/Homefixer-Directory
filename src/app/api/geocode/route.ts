import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

// 30 days cache
const CACHE_TTL = 60 * 60 * 24 * 30

function normalizeKey(address: string) {
        return `geo:${encodeURIComponent(address.trim().toLowerCase().replace(/\s+/g, " "))}`
}

export async function GET(req: Request) {
        try {
                const { searchParams } = new URL(req.url)
                const address = searchParams.get("address")

                if (!address) {
                        return NextResponse.json({ error: "Address is required" }, { status: 400 })
                }

                const cacheKey = normalizeKey(address)

                const cachedRaw = await redis.get(cacheKey)

                if (cachedRaw) {
                        if (typeof cachedRaw === "string") {
                                try {
                                        const parsed = JSON.parse(cachedRaw)
                                        return NextResponse.json(parsed)
                                } catch (parseErr) {
                                        console.warn(`Corrupted cached value for ${cacheKey} — deleting and refetching.`, parseErr)
                                        try { await redis.del(cacheKey) } catch (delErr) { console.warn("Failed to delete corrupted cache key", delErr) }
                                }
                        } else if (typeof cachedRaw === "object") {
                                return NextResponse.json(cachedRaw)
                        } else {
                                try {
                                        const parsed = JSON.parse(String(cachedRaw))
                                        return NextResponse.json(parsed)
                                } catch {
                                        console.warn(`Unparseable cached value type=${typeof cachedRaw} for ${cacheKey}. Deleting.`)
                                        await redis.del(cacheKey).catch(() => { })
                                }
                        }
                }

                const apiKey = process.env.GOOGLE_GEOCODING_API_KEY
                if (!apiKey) {
                        return NextResponse.json({ error: "Geocoding API key not configured" }, { status: 500 })
                }

                const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
                const gRes = await fetch(url)
                const body = await gRes.json()

                if (!gRes.ok) {
                        return NextResponse.json({ error: "Geocoding API HTTP error", details: await gRes.text() }, { status: 502 })
                }
                if (!body || !body.status) {
                        return NextResponse.json({ error: "Geocoding API returned unexpected body", details: body }, { status: 502 })
                }
                if (body.status === "ZERO_RESULTS") {
                        return NextResponse.json({ error: "No geocoding results" }, { status: 404 })
                }
                if (body.status !== "OK") {
                        return NextResponse.json({ error: "Geocoding API error", details: body }, { status: 502 })
                }

                const loc = body.results[0].geometry.location
                const coords = { lat: loc.lat, lon: loc.lng }

                await redis.set(cacheKey, JSON.stringify(coords), { ex: CACHE_TTL })

                return NextResponse.json(coords)
        } catch (err) {
                console.error("Geocode route error:", err)
                return NextResponse.json({ error: "Internal server error", details: String(err) }, { status: 500 })
        }
}
