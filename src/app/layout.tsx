import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderNav from "@/components/header"
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { getAllBusinessesCategory } from "@/sanity/lib/client";
import SiteFooter from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteURL = process.env.NEXT_PUBLIC_BASE_URL

export const metadata: Metadata = {
  metadataBase: new URL(`${siteURL}`),
  title: "Lagos Home Fixers | Explore Lagos's Best Home Service Providers",
  description: "Need repairs, renovations, or gardening? Lagos's Home Fixers connects you with Lagos best home services providers—trusted, fast, and affordable.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const allCategoryRaw = await getAllBusinessesCategory();
  const allCategory = allCategoryRaw?.map((cat) => ({
    ...cat,
    slug: cat.slug ?? "",
  })) ?? [];
  
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <HeaderNav
          exploreMenuItems={allCategory ?? []}
        />
        <main>
          {children}
        </main>
        <SiteFooter/>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
