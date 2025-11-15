import type { MetadataRoute } from 'next'

const siteURL = process.env.NEXT_PUBLIC_BASE_URL

export default function sitemap(): MetadataRoute.Sitemap {
        return [
                {
                        url: `${siteURL}`,
                        lastModified: new Date(),
                        changeFrequency: 'yearly',
                        priority: 1,
                        images: [`${siteURL}/lagoshomefixer-hero-img.webp`],
                },
                {
                        url: `${siteURL}/about-lagos-home-fix`,
                        lastModified: new Date(),
                        changeFrequency: 'monthly',
                        priority: 0.8,
                },
                {
                        url: `${siteURL}/blog`,
                        lastModified: new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.6,
                },
                {
                        url: `${siteURL}/business`,
                        lastModified: new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.7,
                },
                {
                        url: `${siteURL}/category`,
                        lastModified: new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.5,
                },
                {
                        url: `${siteURL}/locations`,
                        lastModified: new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.5,
                },
        ]
}