import { InmobiliariaPiuraContent } from "@/components/inmobiliaria/InmobiliariaPiuraContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inmobiliaria en Piura | Vende o Alquila tu Propiedad | Casaty",
  description: "¿Buscas la mejor inmobiliaria en Piura? En Casaty te ayudamos a vender, alquilar o comprar tu propiedad con asesoría experta y tecnología avanzada. ¡Resultados rápidos!",
  alternates: {
    canonical: "https://casaty.pe/inmobiliaria-en-piura",
  },
  keywords: ["inmobiliaria en piura", "vender casa piura", "alquiler departamentos piura", "agente inmobiliario piura", "casaty piura"],
  openGraph: {
    title: "Inmobiliaria en Piura | Vende o Alquila tu Propiedad | Casaty",
    description: "La inmobiliaria líder en Piura. Te ayudamos a vender o alquilar tu inmueble al mejor precio con marketing profesional.",
    images: [{ url: "/Imagenes/piura-panorama.png" }],
    type: "website",
  }
};

export default function InmobiliariaPiuraPage() {
  return <InmobiliariaPiuraContent />;
}
