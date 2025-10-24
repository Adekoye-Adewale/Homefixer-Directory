import type { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'

export const RichTextComponents: PortableTextComponents = {
        types: {
                image: ({ value }) => (
                        <div className="my-2.5">
                                <Image
                                        src={value.asset?.url}
                                        alt={value.alt || 'Blog image'}
                                        width={1000}
                                        height={600}
                                        className="rounded-lg w-full h-auto object-cover"
                                />
                        </div>
                ),
        },
        list: {
                bullet: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
                number: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
        },
        block: {
                h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold my-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-semibold my-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl md:text-2xl font-semibold my-2">{children}</h3>,
                h4: ({ children }) => <h4 className="text-lg md:text-xl font-semibold my-1">{children}</h4>,
                normal: ({ children }) => <p className="text-sm my-2 leading-relaxed">{children}</p>,
                blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-amber-600 pl-4 italic text-gray-600 my-4">
                                {children}
                        </blockquote>
                ),
        },
        marks: {
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                link: ({ value, children }) => {
                        const target = (value?.href || '').startsWith('https') ? '_blank' : undefined
                        return (
                                <a
                                        href={value?.href}
                                        target={target}
                                        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                                        className="text-amber-600 hover:underline"
                                >
                                        {children}
                                </a>
                        )
                },
        },
}