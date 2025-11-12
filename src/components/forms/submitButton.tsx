import React from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

type SubmitButtonProps = {
        status: "idle" | "submitting" | "submitted"
        label: string
}

export default function SubmitButton({ status = "idle", label }: SubmitButtonProps) {
        return (
                <Button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full mt-4 bg-black text-white border rounded-sm border-black hover:bg-black/10 hover:text-black transition-colors duration-300 text-sm cursor-pointer"
                >
                        {status === "submitting" ? (
                                <span className='flex gap-1 items-center'>
                                        <Loader2 className="size-4 animate-spin" /> 
                                        <span>
                                                Submitting...
                                        </span>
                                </span>
                        ) : (
                                `${ label }`
                        )}
                </Button>
        )
}
