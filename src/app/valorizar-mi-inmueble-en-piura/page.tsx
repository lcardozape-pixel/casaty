import { TasacionesContent } from "@/components/tasaciones/TasacionesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valorizar mi Inmueble en Piura | Tasaciones Casaty",
  description: "¿Necesitas saber cuánto vale tu propiedad? Realizamos tasaciones comerciales y legales en Piura con peritos colegiados. Informe detallado en 48 horas.",
  alternates: {
    canonical: "https://casaty.pe/valorizar-mi-inmueble-en-piura",
  },
};

export default function TasacionesPage() {
  return <TasacionesContent />;
}


