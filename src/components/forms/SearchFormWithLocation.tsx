"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod";
import { customBusinessLocationType } from "@/sanity/lib/customTypes/businessLocation"
import { createSearchSchema } from "./createSearchSchema";
import { Search } from "lucide-react"

export default function SearchFormWithLocation({
        locations,
}: {
        locations: customBusinessLocationType[]
}) {
        const router = useRouter()
        const [businessName, setBusinessName] = useState("")
        const [location, setLocation] = useState("")
        const [error, setError] = useState<string | null>(null)

        const handleSearch = (e: React.FormEvent) => {
                e.preventDefault();

                const schema = createSearchSchema(locations);
                const parseResult = schema.safeParse({ businessName, location });

                if (!parseResult.success) {
                        setError(parseResult.error.issues[0].message);
                        return;
                }

                setError(null);

                const params = new URLSearchParams();
                if (businessName.trim()) params.set("name", businessName.trim());
                if (location) params.set("location", location);

                router.push(`/search?${params.toString()}`);
        };

        return (
                <form
                        onSubmit={handleSearch}
                        className="space-y-3 max-w-lg md:max-w-3xl mx-auto"
                >
                        <div className="flex gap-3 items-start">
                                <div className='flex flex-col gap-1 w-full grow'>
                                        <label className='text-xs text-white/80'>
                                                Business Name
                                        </label>
                                        <input
                                                type="text"
                                                placeholder="What business are you looking for today?"
                                                value={businessName}
                                                onChange={(e) => setBusinessName(e.target.value)}
                                                className="grow w-full text-xs text-white/80 py-2 px-2.5 placeholder:text-xs placeholder:text-white/40 rounded border border-white/80 outline-[#ee9513]"
                                        />
                                </div>

                                <div className='flex flex-col gap-1 w-full grow'>
                                        <label className='text-xs text-white/80'>
                                                Location
                                        </label>
                                        <select
                                                title="location-input"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="grow w-full text-xs text-white/80 py-2 px-2.5 placeholder:text-xs placeholder:text-white/40 rounded border border-white/80 outline-[#ee9513]"
                                        >
                                                <option 
                                                        value=""
                                                        className="text-black font-semibold"
                                                >
                                                        All Locations
                                                </option>
                                                {locations.map((loc) => (
                                                        <option 
                                                                key={loc._id} 
                                                                value={loc.slug}
                                                                className="text-black font-semibold"
                                                        >
                                                                {loc.title}
                                                        </option>
                                                ))}
                                        </select>
                                </div>
                        </div>

                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                        <button
                                type="submit"
                                className="flex gap-1 items-center justify-center w-full py-1.5 px-5 cursor-pointer text-sm font-semibold text-black border bg-[#ee9513] border-solid border-[#ee9513] hover:bg-amber-300 rounded transition-colors duration-300"
                        >
                                <Search className="w-3"/>
                                <span>
                                        Search
                                </span>
                        </button>
                </form>
        )
}
