"use client";

import { BedDouble, Bath, Car, Maximize2, Heart, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Property } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();

  // Limpiar sufijos de precio
  const formatPrice = (p?: string) => p?.replace(/\/(mes|año)/gi, '').trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => router.push(`/propiedades/${property.id}`)}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 group relative flex flex-col h-full will-change-transform cursor-pointer hover:border-[#0127AC]/20 hover:shadow-lg hover:shadow-[#0127AC]/5 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-52 md:h-56 overflow-hidden" suppressHydrationWarning>
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay sutil en la parte inferior */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Labels - Estilo minimalista */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
          {property.propertyType && (
            <div className="bg-white/95 backdrop-blur-sm text-neutral-700 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
              {property.propertyType}
            </div>
          )}
          <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide backdrop-blur-sm ${
            property.type === 'Venta'
              ? 'bg-[#0127AC]/90 text-white'
              : 'bg-emerald-500/90 text-white'
          }`}>
            {property.type === 'Venta' ? 'Venta' : 'Alquiler'}
          </div>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-3.5 right-3.5 h-8 w-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>

      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Price Section - Estilo dual con labels */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex flex-col items-start gap-1">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#0127AC]/5 text-[#0127AC] text-[9px] font-black uppercase tracking-wider leading-none">
              Precio Soles
            </span>
            <span className="text-xl font-black text-neutral-800 leading-none tracking-tight">{formatPrice(property.pricePEN || "")}</span>
          </div>
          {property.priceUSD && (
            <>
              <div className="flex items-center self-end pb-2.5">
                <div className="w-2.5 h-[3px] bg-neutral-200 rounded-full" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider leading-none">
                  Precio Dólares
                </span>
                <span className="text-xl font-black text-neutral-800 leading-none tracking-tight">{formatPrice(property.priceUSD || "")}</span>
              </div>
            </>
          )}
        </div>


        {/* Title */}
        <h3 className="text-neutral-800 font-bold text-[15px] mb-2 leading-snug group-hover:text-[#0127AC] transition-colors line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-4">
          <MapPin className="h-3 w-3 text-[#0127AC]/50 shrink-0" />
          <span className="text-[11px] font-medium text-neutral-400 line-clamp-1">
            {property.district || property.location || 'Piura, Perú'}
          </span>
        </div>

        {/* Features Grid */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
          {property.beds > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-100/50">
              <BedDouble className="h-[18px] w-[18px] text-[#0127AC]/60" />
              <span className="text-xs font-bold text-neutral-600 tracking-tight">{property.beds}</span>
            </div>
          )}
          {property.baths > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-100/50">
              <Bath className="h-[18px] w-[18px] text-[#0127AC]/60" />
              <span className="text-xs font-bold text-neutral-600 tracking-tight">{property.baths}</span>
            </div>
          )}
          {property.garage > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-100/50">
              <Car className="h-[18px] w-[18px] text-[#0127AC]/60" />
              <span className="text-xs font-bold text-neutral-600 tracking-tight">{property.garage}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-100/50">
              <Maximize2 className="h-[18px] w-[18px] text-[#0127AC]/60" />
              <span className="text-xs font-bold text-neutral-600 tracking-tight">{property.area}</span>
            </div>
          )}
          
          {/* Arrow indicator */}
          <div className="ml-auto">
            <div className="h-7 w-7 rounded-lg bg-slate-50 group-hover:bg-[#0127AC] flex items-center justify-center transition-all duration-300">
              <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
