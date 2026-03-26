"use client";

import { BedDouble, Bath, Car, Square, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Property } from "@/lib/data";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group relative flex flex-col h-full will-change-transform"
    >
      {/* Image Wrapper */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.1] group-hover:grayscale-0"
        />
        
        {/* Labels */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
            {property.label && (
              <div className="bg-[#0040FF] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30 uppercase tracking-widest">
                {property.label}
              </div>
            )}
            <div className="bg-white/98 text-neutral-800 text-[9px] font-black px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 border border-slate-100 uppercase tracking-widest">
                <span>EN {property.type === 'Venta' ? 'VENTA' : 'ALQUILER'}</span>
            </div>
        </div>

        <button className="absolute top-6 right-6 h-10 w-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all border border-white/20">
           <Heart className="h-5 w-5" />
        </button>

        {/* Price Overlay - Optimized without backdrop-blur */}
        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
           <div className="bg-white/98 p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-xl flex justify-between items-center border border-white">
              <span className="text-[8px] md:text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em]">Inversión</span>
              <span className="text-lg md:text-xl font-black text-[#0040FF] leading-none">{property.price}</span>
           </div>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="mb-6">
           <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-widest mb-3">
              <MapPin className="h-3 w-3 text-[#0040FF]" />
              <span>{property.location || 'Piura, Perú'}</span>
           </div>
           <h3 className="text-neutral-800 font-black text-xl mb-2 leading-tight group-hover:text-[#0040FF] transition-colors line-clamp-2">
             {property.title}
           </h3>
        </div>

        <div className="mt-auto grid grid-cols-4 gap-2 md:gap-4 py-5 md:py-6 border-t border-slate-50">
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
               <BedDouble className="h-4 w-4 text-[#0040FF]" />
            </div>
            <span className="text-[10px] font-black text-neutral-800 tracking-widest leading-none">{property.beds}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
               <Bath className="h-4 w-4 text-[#0040FF]" />
            </div>
            <span className="text-[10px] font-black text-neutral-800 tracking-widest leading-none">{property.baths}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
               <Car className="h-4 w-4 text-[#0040FF]" />
            </div>
            <span className="text-[10px] font-black text-neutral-800 tracking-widest leading-none">{property.garage}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
               <Square className="h-4 w-4 text-[#0040FF]" />
            </div>
            <span className="text-[8px] font-black text-neutral-800 tracking-widest leading-none text-nowrap">{property.area}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
