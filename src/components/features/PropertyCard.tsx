"use client";

import { BedDouble, Bath, Car, Square, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Property } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onClick={() => router.push(`/propiedades/${property.id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group relative flex flex-col h-full will-change-transform cursor-pointer"
    >
      {/* Image Wrapper */}
      <div className="relative h-56 md:h-64 overflow-hidden shimmer" suppressHydrationWarning>
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.05] group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Labels - Honecta Style */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          {property.propertyType && (
            <div className="bg-neutral-800/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="h-2.5 w-2.5" />
              {property.propertyType}
            </div>
          )}
          <div className="bg-[#0127AC] text-white text-[9px] font-black px-3 py-1.5 rounded-md shadow-lg shadow-black/10 uppercase tracking-widest">
            {property.type === 'Venta' ? 'VENTA' : 'ALQUILER'}
          </div>
          {property.label && (
            <div className="bg-amber-400 text-neutral-900 text-[9px] font-black px-3 py-1.5 rounded-md shadow-lg uppercase tracking-widest">
              {property.label}
            </div>
          )}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-5 right-5 h-9 w-9 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all border border-white/20"
        >
           <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Price - Honecta style */}
        <div className="mb-4">
          <span className="text-xl font-black text-[#0127AC] leading-none">{property.price}</span>
          {property.priceUsd && (
            <span className="text-sm font-bold text-neutral-400 ml-2">/ {property.priceUsd}</span>
          )}
        </div>

        {/* Address */}
        <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-bold mb-2">
          <MapPin className="h-3 w-3 text-neutral-400" />
          <span>{property.address || property.location || 'Piura, Perú'}</span>
        </div>

        {/* Title */}
        <h3 className="text-neutral-800 font-black text-base mb-4 leading-tight group-hover:text-[#0127AC] transition-colors line-clamp-2">
          {property.title}
        </h3>

        {/* Area Footer */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2 text-neutral-500">
          <Square className="h-3.5 w-3.5" />
          <span className="text-xs font-bold">{property.area}</span>
        </div>
      </div>
    </motion.div>
  );
}


