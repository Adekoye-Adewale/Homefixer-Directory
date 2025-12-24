import { getBusinessByLocationSlug, getLoactionBySlug } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import PriBtn from '@/components/buttons/priBtn'
import SubmitYourBizBtn from '@/components/buttons/submitYourBizBtn'
import SingleLocationPageComponent from '@/components/pages/locationPage/singleLocationPage'
import { getBusinessGoogleData } from '@/lib/getBusinessGoogleInfo'

type LocationPageProps = {
        params: Promise<{ slug: string }>
}

export default async function SingleLocationPage({ params }: LocationPageProps ) {

        const { slug } = await params 

        const [ location, business ] = await Promise.all([
                getLoactionBySlug(slug),
                getBusinessByLocationSlug(slug)
        ])

        if ( !location ) {
                notFound();
        }

        if (business?.length === 0) {
                return (
                        <section className='min-h-dvh grid place-content-center'>
                                <div className="text-center py-20">
                                        <h1 className="text-3xl font-bold">
                                                No businesses found
                                        </h1>
                                        <p className="text-gray-600 my-2">
                                                Currently, there are no businesses presently listed under <strong>{location.title}</strong>, Lagos.
                                        </p>
                                        <div className='flex flex-wrap gap-2 items-center justify-center pt-5'>
                                                <SubmitYourBizBtn/>
                                                <PriBtn
                                                        href='/locations'
                                                        title='View other locations'
                                                />
                                        </div>
                                </div>
                        </section>
                );
        }

        const info = await Promise.all(
                business && business.length > 0 ? business.map(biz =>
                        getBusinessGoogleData(biz.businessName, biz.businessAddress ?? biz.location.title)
                ) : []
        )

        return (
                <SingleLocationPageComponent
                        location={location.title}
                        length={business?.length || 0}
                        businessList={business || []}
                        info={info}
                />
        )
}
