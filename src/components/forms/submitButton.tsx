import React from 'react'
import { Button } from "@/components/ui/button"

export default function SubmitButton({ label }: { label: string }) {
        return (
                <Button
                        type="submit"
                        className="w-full mt-4 bg-black text-white border border-black hover:bg-black/10 hover:text-black transition-colors duration-300 text-sm cursor-pointer"
                >
                        {label}
                </Button>
        )
}
