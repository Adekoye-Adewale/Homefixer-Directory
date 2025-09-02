import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

export default function Slider( { slideContent, className }: { slideContent: React.ReactNode[], className?: string } ) {

        return (
                <Swiper
                        modules={[Navigation]}
                        navigation
                        loop={true}
                        className={className}
                        spaceBetween={20}
                        slidesPerView={4}
                >
                        {slideContent.map((slide, index) => (
                                <SwiperSlide 
                                        key={index}
                                >
                                        {slide}
                                </SwiperSlide>
                        ))}
                </Swiper>
        )
}
