import React from 'react'
import MainBusinessCard from './businessCard'
import { BizContentCardProps } from './businessCardProps'
import {
        Carousel,
        CarouselContent,
        CarouselItem,
        CarouselNext,
        CarouselPrevious,
} from "@/components/ui/carousel"

type MainBusinessListProps = {
        BizContents: BizContentCardProps[]
}

export default function MainBizCarousel({ BizContents }: MainBusinessListProps) {
        return (
                <>
                        <Carousel
                                opts={{
                                        align: "center",
                                }}
                        >
                                <CarouselContent>
                                        {BizContents.map((content) => (
                                                <CarouselItem 
                                                        key={content._id} 
                                                        className="pl-2.5 md:pl-5 md:basis-1/2 lg:basis-1/4"
                                                >
                                                        <MainBusinessCard
                                                                coverImgUrl={content.coverImage}
                                                                logoUrl={content.businessLogo}
                                                                title={content.businessName}
                                                                description={content.description}
                                                                category={content.category.title}
                                                                categorySlug={`/${content.category.title}`}
                                                                location={content.location?.title}
                                                                locationSlug={`/${content.location?.title}`}
                                                                businessSlug={content.slug.current}
                                                                businessWebsite={content.businessWebsite}
                                                        />
                                                </CarouselItem>
                                        ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                        </Carousel>
                </>
        )
}
