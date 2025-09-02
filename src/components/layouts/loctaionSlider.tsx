'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import LocationCard from '../location/locationCard'
import { customBusinessLocationType } from '@/sanity/lib/customTypes/businessLocation'

type LocationSliderProps = {
        slideContent: customBusinessLocationType[]
        className: string
}

export default function LocationSlider( { slideContent, className }: LocationSliderProps ) {

        return (
                <Swiper
                        modules={[Navigation]}
                        navigation
                        loop={true}
                        className={className}
                        spaceBetween={20}
                        slidesPerView={4}
                >
                        {slideContent.map((slide) => (
                                <SwiperSlide 
                                        key={slide._id}
                                >
                                        <LocationCard
                                                slug={slide.slug}
                                                image={slide.image}
                                                title={slide.title}
                                        />
                                </SwiperSlide>
                        ))}
                </Swiper>
        )
}