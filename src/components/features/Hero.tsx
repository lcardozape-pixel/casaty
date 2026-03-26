'use client';

import React, { useState } from 'react';
import { Search, MapPin, Home, Building2, LandPlot, ChevronDown, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

type SearchTab = 'Comprar' | 'Alquilar' | 'Proyectos';

export function Hero() {
  const [activeTab, setActiveTab] = useState<SearchTab>('Comprar');

  return (
    <section className="relative min-h-[950px] md:h-[800px] flex items-start md:items-center justify-center overflow-hidden pt-18 pb-32 md:pt-0 md:pb-0">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-50 z-10" />
        <motion.img
          initial={{ scale: 1 }}
          src="/Imagenes/piura-panorama.png"
          alt="Piura Modern Panorama"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-[1700px] mx-auto px-4 w-full">
        <div className="max-w-4xl mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 w-fit mb-4">
              <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Más de 1,200 Propiedades en la red Honecta®</span>
            </div>

            <h1 className="text-3xl md:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tighter">
              El Hogar de Tus <br /> <span className="text-[#0040FF] drop-shadow-lg">Sueños</span> en Piura.
            </h1>
            <p className="text-sm md:text-xl text-white/90 font-medium max-w-xl leading-relaxed">
              Busca, encuentra y asegura tu próxima inversión con el respaldo legal y comercial de los expertos.
            </p>
          </motion.div>
        </div>

        {/* Search Engine Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative group lg:max-w-5xl"
        >
          {/* Tabs - Segmented Control style for Mobile */}
          <div className="flex p-1.5 bg-black/10 backdrop-blur-md md:backdrop-blur-none rounded-2xl mb-4 md:mb-3 relative z-10 md:ml-4 self-center w-full max-w-[340px] md:max-w-none md:bg-transparent md:p-0 md:rounded-none md:gap-3">
            {(['Comprar', 'Alquilar', 'Proyectos'] as SearchTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-initial px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                    ? 'bg-white text-[#0040FF] shadow-sm md:shadow-lg'
                    : 'text-white/80 hover:bg-white/10 md:bg-white/10 md:backdrop-blur-md md:hover:bg-white/20 md:border md:border-white/10'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box Card - Optimized without backdrop-blur */}
          <div className="bg-white rounded-[2.5rem] p-3 shadow-2xl shadow-black/20 flex flex-col lg:flex-row items-center gap-3 border border-white">
            {/* Location Input */}
            <div className="flex-1 min-w-[200px] px-6 py-4 bg-slate-50/50 rounded-[1.8rem] border border-slate-100 flex items-center gap-4 group/input focus-within:ring-2 focus-within:ring-[#0040FF]/20 transition-all">
              <MapPin className="h-5 w-5 text-[#0040FF] shrink-0" />
              <div className="flex-1">
                <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.15em] mb-1">Localización</p>
                <input
                  type="text"
                  placeholder="¿Dónde quieres vivir?"
                  className="w-full bg-transparent border-none p-0 font-bold text-neutral-800 placeholder:text-neutral-300 focus:ring-0 text-sm"
                />
              </div>
            </div>

            {/* Type & Investment Row for Mobile */}
            <div className="grid grid-cols-2 gap-4 lg:contents">
              {/* Type Dropdown */}
              <div className="px-5 py-4 bg-slate-50/50 rounded-[1.8rem] border border-slate-100 flex items-center gap-3 group/input hover:bg-slate-100 transition-all cursor-pointer">
                <Home className="h-5 w-5 text-neutral-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.15em] mb-1">Tipo</p>
                  <select className="w-full bg-transparent border-none p-0 font-bold text-neutral-800 focus:ring-0 text-[13px] appearance-none cursor-pointer">
                    <option>Todos</option>
                    <option>Casas</option>
                    <option>Dptos</option>
                    <option>Terrenos</option>
                  </select>
                </div>
              </div>

              {/* Price Dropdown */}
              <div className="px-5 py-4 bg-slate-50/50 rounded-[1.8rem] border border-slate-100 flex items-center gap-3 group/input hover:bg-slate-100 transition-all cursor-pointer">
                <Building2 className="h-5 w-5 text-neutral-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.15em] mb-1">Inversión</p>
                  <select className="w-full bg-transparent border-none p-0 font-bold text-neutral-800 focus:ring-0 text-[13px] appearance-none cursor-pointer">
                    <option>Cualquier</option>
                    <option>S/ 200k</option>
                    <option>S/ 500k+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <Button
              size="lg"
              className="lg:flex-1 w-full lg:w-auto shadow-lg shadow-blue-200 lg:hover:scale-[1.02]"
            >
              <Search className="h-5 w-5 mr-3" />
              BUSCAR
            </Button>
          </div>

          {/* Quick Filters / Tags */}
          <div className="flex flex-wrap gap-3 mt-6 ml-4">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-1 mr-2">Filtros Pro:</span>
            {['Los Ejidos', 'Santa María del Valle', 'Castilla', 'Miraflores'].map((tag) => (
              <button key={tag} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#0040FF] transition-all">
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
