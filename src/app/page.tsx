import { HomeContent } from "@/components/home/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inmobiliaria Casaty | Casas, departamento y terrenos en Piura",
  description: "Ofrecemos una gama completa de servicios para satisfacer todas tus necesidades inmobiliarias en Piura. Compra, vende o tasa tu propiedad con expertos.",
  alternates: {
    canonical: "https://casaty.pe",
  },
};

export default function Home() {
  return <HomeContent />;
}


