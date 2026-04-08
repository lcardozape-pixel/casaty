import { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inmobiliaria Casaty | Casas, departamento y terrenos en Piura",
  description: "Ofrecemos una gama completa de servicios para satisfacer todas tus necesidades inmobiliarias en Piura. Nuestro equipo de expertos está comprometido con brindarte la mejor asesoría en compra, venta y tasación de propiedades.",
  keywords: ["Inmobiliaria en Piura", "Venta de casas en Piura", "Departamentos en Piura", "Tasaciones en Piura", "Agentes inmobiliarios Piura", "Casaty"],

  openGraph: {
    title: "Inmobiliaria Casaty | Casas, departamento y terrenos en Piura",
    description: "Expertos inmobiliarios en Piura. Compra, vende o tasa tu propiedad con los mejores profesionales.",
    url: "https://casaty.pe",
    siteName: "Casaty",
    locale: "es_PE",
    type: "website",
  },
  icons: {
    icon: "/Logo/favicon.webp",
  },
  verification: {
    google: "roKX5BdaIW1GIuUUHHDI_l6kC2mmAzQgyaZKOjxR250",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactWhatsApp } from "@/components/ui/ContactWhatsApp";
import { SchemaOrg } from "@/components/SEO/SchemaOrg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col font-sans overflow-x-hidden"
        suppressHydrationWarning
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4P7MPL1RZP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4P7MPL1RZP');
          `}
        </Script>

        <SchemaOrg />
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

