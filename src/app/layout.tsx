import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderNav from "@/components/header"
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lagos Home Fixers | Explore Lagos's Best Ho me Service Providers",
  description: "Need repairs, renovations, or gardening? Lagos's Home Fixers connects you with Lagos best home services providers—trusted, fast, and affordable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <HeaderNav/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
