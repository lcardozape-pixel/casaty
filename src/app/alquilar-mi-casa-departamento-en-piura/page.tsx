import { AlquilarContent } from "@/components/alquilar/AlquilarContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alquilar mi Casa o Departamento en Piura | Casaty",
  description: "¿Buscas alquilar tu propiedad en Piura? En Casaty filtramos al inquilino ideal y blindamos tu contrato para un alquiler seguro y puntual.",
  alternates: {
    canonical: "https://casaty.pe/alquilar-mi-casa-departamento-en-piura",
  },
};

export default function AlquilarPage() {
  return <AlquilarContent />;
}


