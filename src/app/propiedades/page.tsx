import { Metadata } from "next";
import SearchResults from "@/components/features/SearchResults";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Propiedades en Venta y Alquiler en Piura | Casaty",
  description: "Encuentra las mejores casas, departamentos y terrenos en Piura. Filtra por tipo de propiedad, operación y ubicación con nuestra red de agentes aliados.",
  alternates: {
    canonical: "https://casaty.pe/propiedades",
  },
};

export default function PropiedadesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin h-10 w-10 border-4 border-[#0040FF] border-t-transparent rounded-full"></div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
