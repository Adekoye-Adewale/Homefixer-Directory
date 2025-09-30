'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import LocationCard from '../location/locationCard'
import { customBusinessLocationType } from '@/sanity/lib/customTypes/businessLocation'
import 'swiper/css'
import 'swiper/css/navigation'

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
                        breakpoints={{
                                0: { slidesPerView: 2 },      // mobile
                                640: { slidesPerView: 3 },    // tablets
                                1024: { slidesPerView: 4 },   // desktops
                        }}
                >
                        {slideContent.map((slide) => (
                                <SwiperSlide 
                                        key={slide._id}
                                >
                                        <LocationCard
                                                slug={slide.slug}
                                                image={slide.image}
                                                title={slide.title}
                                                businessCount={slide.businessCount}
                                        />
                                </SwiperSlide>
                        ))}
                </Swiper>
        )
}