"use client";

import { useParams } from "next/navigation";
import { PropertyCard } from "@/components/features/PropertyCard";
import { properties } from "@/lib/data";
import { motion } from "framer-motion";

export default function CatalogPage() {
  const params = useParams();
  const type = params.type as string; // 'venta' or 'alquiler'
  
  const filteredProperties = properties.filter(p => 
    p.type.toLowerCase() === type.toLowerCase()
  );

  const title = type === "venta" ? "Propiedades en Venta" : "Propiedades en Alquiler";
  const subtitle = type === "venta" 
    ? "Encuentra la casa, departamento o terreno de tus sueños disponible para compra en Piura." 
    : "Explora las mejores opciones de arrendamiento con la seguridad y respaldo de Casaty.";

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <section className="bg-neutral-900 text-white py-20 px-6 lg:px-12 rounded-b-[3rem] md:rounded-b-[4rem] shadow-xl">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-5xl font-black mb-6 capitalize leading-tight">
              {title}
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl font-medium leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <p className="text-neutral-500 font-bold border-l-4 border-[#0040FF] pl-4">
            Se encontraron <span className="text-neutral-800 font-black">{filteredProperties.length}</span> propiedades disponibles.
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-neutral-800 mb-4">No se encontraron propiedades</h3>
            <p className="text-neutral-500 font-bold">Estamos trabajando para ampliar nuestro catálogo en esta categoría.</p>
          </div>
        )}
      </section>
    </main>
  );
}
