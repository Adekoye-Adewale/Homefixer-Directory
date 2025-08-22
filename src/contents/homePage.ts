import { cardProps, connectingBizCardProps } from "@/components/pages/homePage/homeContentTypes"

export const howItWorksContents: cardProps[] = [
        {
                title: `Find Businesses`,
                description: `Discover & connect with great local businesses in your local neighborhood like dentists, hair stylists and more.`,
                imgSrc: `/icons/target.gif`,
        },
        {
                title: `Read Listings Reviews`,
                description: `Get valuable insights about listings by reading through what others have to say about their experiences with the business.`,
                imgSrc: `/icons/feedback-loop.gif`,
        },
        {
                title: `Contact Business`,
                description: `Easily setup an appointment directly from the business listing page using our integrated booking options.`,
                imgSrc: `/icons/customer-service.gif`,
        },
]

export const connectBizContents: connectingBizCardProps[] = [
        {
                titleTop: `Request `,
                titleBottom: `a service`,
                description: `Search businesses for your match.`,
        },
        {
                titleTop: `Explore `,
                titleBottom: `your loctaion`,
                description: `Browse businesses from your location.`,
        },
        {
                titleTop: `Connect with `,
                titleBottom: `your best fixer`,
                description: `Find and connect with fixers close to you.`,
        },
]