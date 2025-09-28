import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number | null }) {
        const rounded = Math.round(rating ?? 0)

        return (
                <span className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                        key={i}
                                        className={`w-3 h-3 
                                                ${i < rounded ? "text-yellow-500 fill-yellow-500" : "text-gray-300 stroke-gray-600"
                                                }
                                        `}
                                />
                        ))}
                </span>
        );
}
