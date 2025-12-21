import { NextResponse } from "next/server";

export async function GET(req: Request) {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY!;

        const { searchParams } = new URL(req.url);
        const photoRef = searchParams.get("photoRef");
        const maxWidth = searchParams.get("maxWidth") || "1600";

        if (!photoRef) {
                return NextResponse.json(
                        { error: "Missing photoRef" }, 
                        { status: 400 }
                );
        }

        const googleUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoRef}&key=${apiKey}`;

        const response = await fetch(
                googleUrl, 
                { 
                        redirect: "follow" 
                }
        );

        if (!response.ok || !response.body) {
                return NextResponse.json(
                        { error: "Failed to fetch image" }, 
                        { status: response.status }
                );
        }

        return new NextResponse(response.body, {
                headers: {
                        "Content-Type": response.headers.get("content-type") ?? "image/jpeg",
                        "Cache-Control": "public, max-age=86400, immutable",
                },
        });
}
