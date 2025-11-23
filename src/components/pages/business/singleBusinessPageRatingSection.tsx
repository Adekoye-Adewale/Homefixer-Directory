import StarRating from '@/components/mapsComponents/StarRating';
import { BusinessData, Review } from '@/lib/getBusinessGoogleInfo';
import Link from 'next/link';
import React, {Fragment} from 'react'
import { SquareArrowOutUpRight } from 'lucide-react';

export default function SingleBusinessPageRatingSection({
        info, 
        businessName = 'This Business'
}: { info: BusinessData | null; businessName?: string }) {

        if (!info) {
                return (
                        <section className='py-5 md:py-10 px-2.5 md:px-5'>
                                <div className='container relative mx-auto'>
                                        <div className='border border-sm border-gray-300 rounded-sm p-5'>
                                                <p className="p-4 text-center text-sm font-bold text-red-500">
                                                        Could not fetch this {businessName} Google ratings and review
                                                </p>
                                        </div>
                                </div>
                        </section>
                )
        }

        const { 
                rating, 
                user_ratings_total, 
                reviews,
                url
        } = info

        return (
                <section className='py-5 md:py-10 px-2.5 md:px-5'>
                        <div className='container relative mx-auto'>
                                <div className='border border-sm border-gray-300 rounded-sm p-5'>
                                        <h3 className='font-bold text-sm mb-2.5'>
                                                Public Review Sentiment
                                        </h3>      
                                        <div>
                                                <div className="flex items-center gap-1">
                                                        <span className="flex items-center gap-1 text-black text-xs font-bold">
                                                                 <StarRating rating={rating} />
                                                                {rating && rating > 0 && <span>
                                                                        {rating.toFixed(1)}
                                                                </span>}
                                                        </span>
                                                        <span className="text-xs">
                                                                Based on  {user_ratings_total} Google reviews
                                                        </span>
                                                </div>

                                                <div>
                                                        {reviews && reviews.length > 0 ? (
                                                                <>
                                                                        {reviews.slice(0, 3).map((review, index) => (
                                                                                <Fragment key={index}>
                                                                                        <ReviewCard review={review} />
                                                                                </Fragment>
                                                                        ))}

                                                                        {url && (
                                                                                <Link
                                                                                        href={url}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="mt-5 flex gap-1 items-center text-xs font-semibold my-2.5 text-blue-600"
                                                                                >
                                                                                        <span>
                                                                                                View more reviews on Google
                                                                                        </span>
                                                                                        <SquareArrowOutUpRight className='size-3' />
                                                                                </Link>
                                                                        )}
                                                                </>
                                                        ) : (
                                                                <p className="text-xs text-gray-500 mt-2.5 border-t border-gray-300 pt-2.5">
                                                                        No reviews available.
                                                                </p>
                                                        )}
                                                </div>
                                        </div>                                  
                                </div>
                        </div>
                </section>
        )
}

const ReviewCard = (
        { 
                review 
        }: {
                review: Review
        }) => {
        return (
                <div className="border-t border-gray-300 mt-4 pt-4">
                        <div className='flex justify-between items-end'>
                                <div className='flex gap-2 items-center'>
                                        <p className="font-bold text-xs capitalize">
                                                {review.author_name}
                                        </p>
                                        <p className="text-black text-xs font-normal">
                                                <StarRating rating={review.rating} /> 
                                        </p>
                                </div>
                                <p className='text-[10px] text-gray-400 italic'>
                                        Since {review.relative_time_description}
                                </p>
                        </div>
                        <p className="text-xs text-gray-900 mt-1">
                                {review.text}
                        </p>
                </div>
        )
}