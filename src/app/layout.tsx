import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casaty | Inmobiliaria Premium",
  description: "Migración de alto rendimiento de Casaty a Next.js",
  icons: {
    icon: "/Logo/favicon.webp",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactWhatsApp } from "@/components/ui/ContactWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <Navbar />
        <div className="flex-grow pt-20">
          {children}
        </div>
        <Footer />
        {/* <ContactWhatsApp /> */}
      </body>
    </html>
  );
}

