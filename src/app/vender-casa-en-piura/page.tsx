import { VenderPropiedadContent } from "@/components/vender/VenderPropiedadContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vender mi Casa en Piura | Inmobiliaria Casaty",
  description: "¿Quieres vender tu casa en Piura? En Casaty te ayudamos a vender rápido y al mejor precio de mercado. Tasación gratuita y marketing profesional.",
  alternates: {
    canonical: "https://casaty.pe/vender-casa-en-piura",
  },
};

export default function VenderPropiedadPage() {
  return <VenderPropiedadContent />;
}
