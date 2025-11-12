import React from 'react'

export default function FormConfirmation({ title }: { title: string}) {
        return (
                <div className="text-center space-y-2 py-10 mx-auto">
                        <h2 className="text-lg font-semibold text-green-600">
                                {title}
                        </h2>
                        <p className="text-xs text-gray-600">
                                A confirmation email has been sent to you. Our team will reach out shortly.
                        </p>
                </div>
        )
}
