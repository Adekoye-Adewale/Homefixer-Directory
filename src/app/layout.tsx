import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderNav from "@/components/header"
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import { Toaster } from "@/components/ui/sonner"
import { getAllBusinessesCategory } from "@/sanity/lib/client";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lagos Home Fixers | Explore Lagos's Best Ho me Service Providers",
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
        <SanityLive/>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
