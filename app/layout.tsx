import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { weddingData } from "@/config/wedding-data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: weddingData.seo.title,
  description: weddingData.seo.description,
  keywords: [
    "Telugu wedding",
    "wedding invitation",
    weddingData.couple.bride.firstName,
    weddingData.couple.groom.firstName,
    "Hyderabad wedding",
    "శుభ వివాహం",
  ],
  openGraph: {
    title: weddingData.seo.title,
    description: weddingData.seo.description,
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased w-full min-h-screen flex flex-col">
        <Navbar />
        <main className="w-full flex-1 flex flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}