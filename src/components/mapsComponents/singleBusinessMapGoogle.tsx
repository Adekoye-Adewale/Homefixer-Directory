"use client"
import { useEffect, useState } from "react"
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"

type Props = {
        businessAddress: string
        businessName?: string
        height?: string
}

const containerStyle = { width: "100%", height: "200px" }

export default function SingleBusinessMapGoogle({ businessAddress, businessName = "Business" }: Props) {

        const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null)
        const [error, setError] = useState<string | null>(null)

        const { isLoaded, loadError } = useJsApiLoader({
                googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        })

        useEffect(() => {
                if (!businessAddress) return
                let cancelled = false

                async function fetchCoords() {
                        try {
                                setError(null)
                                setPosition(null)
                                const res = await fetch(`/api/geocode?address=${encodeURIComponent(businessAddress)}`)
                                if (!res.ok) {
                                        const body = await res.json().catch(() => null)
                                        throw new Error(body?.error || `HTTP ${res.status}`)
                                }
                                const data = await res.json()
                                if (!cancelled) {
                                        setPosition({ lat: data.lat, lng: data.lon })
                                }
                        } catch (err: unknown) {
                                console.error("Geocode fetch error:", err)
                                if (!cancelled) setError(String((err as Error)?.message || String(err)))
                        }
                }

                fetchCoords()
                return () => { cancelled = true }
        }, [businessAddress])

        if (loadError) return (
                <div className="grid place-content-center w-full h-[200px] rounded-sm border border-gray-300 text-red-600 p-2 text-xs">
                        Map load error: {String(loadError)}
                </div>
        )

        if (!isLoaded) return (
                <div className="grid place-content-center w-full h-[200px] rounded-sm animate-pulse bg-zinc-500 p-2 text-xs">
                        Loading map...
                </div>
        )

        return (
                <div className="w-full h-[200px] border border-gray-300 rounded-sm overflow-clip">
                        {error && <MapErrorState error={error} />}
                        {!position && !error && <MapLoadingState />}
                        {position && (
                                <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={position}
                                        zoom={15}
                                >
                                        <MarkerF position={position} title={businessName} />
                                </GoogleMap>
                        )}
                </div>
        )
}

const MapErrorState = ({ error }: { error: string }) => (
        <div className="grid place-content-center w-full h-[200px] rounded-sm border border-gray-400 text-red-600 bg-gray-300 p-2 text-xs">
                {error}
        </div>
)

const MapLoadingState = () => (
        <div className="grid place-content-center w-full h-[200px] rounded-sm animate-pulse bg-zinc-500 p-2 text-xs">
                Loading map...
        </div>
)