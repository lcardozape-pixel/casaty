import { AboutContent } from "@/components/about/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Inmobiliaria Casaty en Piura",
  description: "Conoce a Casaty, la inmobiliaria líder en Piura dedicada a transformar el sector con transparencia, tecnología Honecta® y un equipo experto.",
  alternates: {
    canonical: "https://casaty.pe/sobre-nosotros",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
