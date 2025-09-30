import Link from 'next/link'

export default function NotFound() {
        return (
                <main className='min-h-screen flex items-center justify-center'>
                        <div className='container mx-auto py-20 px-5 text-center'>
                                <h2 className='text-2xl font-bold'>
                                        Not Found
                                </h2>
                                <p className='text-xs '>
                                        Could not find requested page
                                </p>
                                <Link 
                                        href="/"
                                        className='inline-block mt-5 text-xs font-bold underline text-blue-800'
                                >
                                        Return home
                                </Link>
                        </div>
                </main>
        )
}