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
    <main className="flex min-h-screen flex-col">
      <section className="bg-secondary text-white py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 capitalize">
              {title}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <p className="text-neutral-500 font-medium">
            Se encontraron <span className="text-secondary font-bold">{filteredProperties.length}</span> propiedades disponibles.
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-300">
            <h3 className="text-2xl font-bold text-secondary mb-4">No se encontraron propiedades</h3>
            <p className="text-neutral-500">Estamos trabajando para ampliar nuestro catálogo en esta categoría.</p>
          </div>
        )}
      </section>
    </main>
  );
}
