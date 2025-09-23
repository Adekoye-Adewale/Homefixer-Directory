import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
        const rounded = Math.round(rating)

        return (
                <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                        key={i}
                                        className={`w-5 h-5 
                                                ${i < rounded ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                                }
                                        `}
                                />
                        ))}
                </div>
        );
}
