"use client"
import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuGroup,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CircleEllipsis, Copy, Facebook, Linkedin, MessageCircle, Send, Share, Twitter } from "lucide-react"


const getPageUrl = () =>
        typeof window !== "undefined" ? window.location.href : ""

export default function ShareButton() {
        const handleShare = async (platform: string) => {
                const url = getPageUrl()

                switch (platform) {
                        case "facebook":
                                window.open(
                                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                url
                                        )}`,
                                        "_blank",
                                        "noopener,noreferrer"
                                )
                                break
                        case "twitter":
                                window.open(
                                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                                url
                                        )}&text=${encodeURIComponent("Check out this Lagos Home Fixer!")}`,
                                        "_blank",
                                        "noopener,noreferrer"
                                )
                                break
                        case "linkedin":
                                window.open(
                                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                                url
                                        )}`,
                                        "_blank",
                                        "noopener,noreferrer"
                                )
                                break
                        case "whatsapp":
                                window.open(
                                        `https://wa.me/?text=${encodeURIComponent(url)}`,
                                        "_blank",
                                        "noopener,noreferrer"
                                )
                                break
                        case "telegram":
                                window.open(
                                        `https://t.me/share/url?url=${encodeURIComponent(
                                                url
                                        )}&text=${encodeURIComponent("Check out this Lagos Home Fixer!")}`,
                                        "_blank",
                                        "noopener,noreferrer"
                                )
                                break
                        case "copylink":
                                try {
                                        await navigator.clipboard.writeText(url)
                                        toast.success("Link copied to clipboard ✅")
                                } catch (err) {
                                        console.error("Failed to copy: ", err)
                                }
                                break
                        case "customShare":
                                if (navigator.share) {
                                        try {
                                                await navigator.share({
                                                        title: document.title,
                                                        text: "Check out this Lagos Home Fixer!",
                                                        url,
                                                })
                                        } catch (err) {
                                                console.error("Share failed:", err)
                                        }
                                } else {
                                        toast("Native share not supported on this device.")
                                }
                                break
                }
        }

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <Button
                                        size="sm"
                                        className="w-[120px] flex items-center justify-between gap-0.5 rounded-sm border border-[#ee9513] focus-visible:border-0 focus-visible:ring-0 bg-[#EE9513] text-black text-xs font-semibold transition-all duration-300 hover:text-[#533404] hover:bg-amber-100 cursor-pointer"
                                >
                                        <span className="">
                                                Share via
                                        </span>
                                        <Share/>
                                </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                                <DropdownMenuLabel 
                                        className="text-xs text-black/60"
                                >
                                        Share business via
                                </DropdownMenuLabel>
                                <DropdownMenuGroup>
                                        <DropdownMenuItem 
                                                onClick={() => handleShare("facebook")}
                                                className="text-xs cursor-pointer hover:bg-gray-300  transition-all duration-300"
                                        >
                                                <Facebook/>
                                                Facebook
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                                onClick={() => handleShare("twitter")}
                                                className="text-xs cursor-pointer hover:bg-gray-300  transition-all duration-300"
                                        >
                                                <Twitter/>
                                                Twitter
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                                onClick={() => handleShare("linkedin")} 
                                                className="text-xs cursor-pointer hover:bg-gray-300  transition-all duration-300"
                                        >
                                                <Linkedin/>
                                                LinkedIn
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                                onClick={() => handleShare("whatsapp")}
                                                className="text-xs cursor-pointer hover:bg-gray-300  transition-all duration-300"
                                        >
                                                <MessageCircle/>
                                                WhatsApp
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                                onClick={() => handleShare("telegram")}
                                                className="text-xs cursor-pointer hover:bg-gray-300  transition-all duration-300"
                                        >
                                                <Send/>
                                                Telegram
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                                onClick={() => handleShare("copylink")}
                                                className="text-xs cursor-pointer hover:bg-gray-300  transition-all duration-300"
                                        >
                                                <Copy/>
                                                Copy Link
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                                onClick={() => handleShare("customShare")}
                                                className="text-xs cursor-pointer hover:bg-gray-300  transition-all duration-300"
                                        >
                                                <CircleEllipsis/>
                                                More Options
                                        </DropdownMenuItem>
                                </DropdownMenuGroup>
                        </DropdownMenuContent>
                </DropdownMenu>
        )
}
