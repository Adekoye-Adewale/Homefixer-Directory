'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import CategoryCard from '../category/categoryCard'
import { customBusinessCategoryType } from '@/sanity/lib/customTypes/businessCategory'
import 'swiper/css'

type CategorySliderProps = {
        slideContent: customBusinessCategoryType[]
        className: string
}

export default function CategorySlider( { slideContent, className }: CategorySliderProps ) {

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
                                        <CategoryCard
                                                slug={slide.slug}
                                                image={slide.image}
                                                title={slide.title}
                                        />
                                </SwiperSlide>
                        ))}
                </Swiper>
        )
}