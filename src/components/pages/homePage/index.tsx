import React from 'react'
import HeroSection from './heroSection'
import HowItWorks from './howItWorks'
import ConnectingBiz from './connectingBiz'
import ListingSection from './listingSection'
import { customBusiness } from '@/sanity/lib/customTypes/business'
import LocationListSection from './locationListSection'
import { customBusinessLocationType } from '@/sanity/lib/customTypes/businessLocation'
import CategoryListSection from '@/components/category/categoryListSection'
import { customBusinessCategoryType } from '@/sanity/lib/customTypes/businessCategory'

type FrontPageProps = {
        allBizList: customBusiness[]
        allLocationList: customBusinessLocationType[]
        allCategoryList: customBusinessCategoryType[]
}

export default function FrontPage({ 
        allBizList, 
        allLocationList,
        allCategoryList
}: FrontPageProps ) {
        return (
                <>
                        <HeroSection/>
                        <HowItWorks/>
                        <ListingSection
                                sectionTitle='Discover Our Top Listings'
                                archivePageSlug='/business'
                                slugTitle='See all businesses'
                                allBizList={allBizList}
                                bg='bg-amber-100'
                        />
                        <LocationListSection
                                sectionTitle='Where is your home?'
                                archivePageSlug='/locations'
                                slugTitle='See all locations'
                                allLocationList={allLocationList}
                                bg='bg-white'
                        />
                        <ListingSection
                                sectionTitle='Top plumbers near you'
                                archivePageSlug='/category/plumbers'
                                slugTitle='See all plumbers'
                                allBizList={allBizList}
                                bg='bg-amber-100'
                        />
                        <CategoryListSection
                                sectionTitle='What service do you need?'
                                archivePageSlug='/category'
                                slugTitle='See all services'
                                allCategoryList={allCategoryList}
                                bg='bg-white'
                        />
                        <ConnectingBiz/>
                </>
        )
}
