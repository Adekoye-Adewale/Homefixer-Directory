"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const defaultPosition: [number, number] = [6.5244, 3.3792]  // Lagos fallback

type SingleBusinessMapProps = {
        businessAddress: string
        businessName: string
}

export default function SingleBusinessMap({ businessAddress, businessName }:  SingleBusinessMapProps ) {

        const [position, setPosition] = useState<[number, number] | null>(null)

        useEffect(() => {
                async function fetchCoords() {
                        if (!businessAddress) return
                        try {
                                const res = await fetch(`/api/geocode?address=${encodeURIComponent(businessAddress)}`)
                                const data = await res.json()
                                if (data?.lat && data?.lon) {
                                        setPosition([data.lat, data.lon])
                                } else {
                                        setPosition(defaultPosition)
                                }
                        } catch (err) {
                                console.error("Geocoding failed:", err)
                                setPosition(defaultPosition)
                        }
                }
                fetchCoords()
        }, [businessAddress])

        if (!position) return <p>Loading map...</p>

        const customIcon = new L.Icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                iconSize: [30, 30],
                iconAnchor: [15, 30],
        })

        return (
                <MapContainer
                        center={position}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: "200px", width: "100%" }}
                >
                        <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
                        />
                        <Marker position={position} icon={customIcon}>
                                <Popup>
                                        {businessName}
                                </Popup>
                        </Marker>
                </MapContainer>
        )
}
