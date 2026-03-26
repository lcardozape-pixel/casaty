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
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
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
          {/* Tabs */}
          <div className="flex gap-2 mb-[-1px] relative z-10 md:ml-4">
            {(['Comprar', 'Alquilar', 'Proyectos'] as SearchTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-t-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                    ? 'bg-white text-[#0040FF] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]'
                    : 'bg-white/25 text-white backdrop-blur-md hover:bg-white/40 border-x border-t border-white/30'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-[2rem] p-3 lg:p-4 shadow-2xl shadow-black/20 flex flex-col lg:flex-row items-stretch gap-3 border border-white">
            {/* Location Input */}
            <div className="flex-1 min-w-[200px] px-5 py-3 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex items-center gap-3 group/input focus-within:ring-2 focus-within:ring-[#0040FF]/20 transition-all">
              <MapPin className="h-5 w-5 text-[#0040FF] shrink-0" />
              <div className="flex-1">
                <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Localización</p>
                <input
                  type="text"
                  placeholder="¿Dónde quieres vivir?"
                  className="w-full bg-transparent border-none p-0 font-black text-neutral-800 placeholder:text-neutral-300 focus:ring-0 text-sm"
                />
              </div>
            </div>

            {/* Type Dropdown */}
            <div className="flex-1 min-w-[180px] px-5 py-3 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex items-center gap-3 group/input hover:bg-slate-100 transition-all cursor-pointer">
              <Home className="h-5 w-5 text-neutral-400 shrink-0" />
              <div className="flex-1">
                <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Tipo</p>
                <select className="w-full bg-transparent border-none p-0 font-black text-neutral-800 focus:ring-0 text-sm appearance-none cursor-pointer">
                  <option>Todos los tipos</option>
                  <option>Casas</option>
                  <option>Departamentos</option>
                  <option>Terrenos</option>
                </select>
              </div>
              <ChevronDown className="h-3 w-3 text-neutral-400" />
            </div>

            {/* Price Dropdown (Placeholder for Honecta Range) */}
            <div className="flex-1 min-w-[160px] px-5 py-3 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex items-center gap-3 group/input hover:bg-slate-100 transition-all cursor-pointer">
              <Building2 className="h-5 w-5 text-neutral-400 shrink-0" />
              <div className="flex-1">
                <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Inversión</p>
                <select className="w-full bg-transparent border-none p-0 font-black text-neutral-800 focus:ring-0 text-sm appearance-none cursor-pointer">
                  <option>Cualquier monto</option>
                  <option>Hasta S/ 200k</option>
                  <option>Más de S/ 500k</option>
                </select>
              </div>
              <ChevronDown className="h-3 w-3 text-neutral-400" />
            </div>

            {/* Search Button */}
            <Button
              size="lg"
              className="h-auto lg:h-[68px] px-8 rounded-[1.5rem] bg-[#0040FF] shadow-lg shadow-blue-200 group-hover:scale-105 transition-all text-base font-black"
            >
              <Search className="h-5 w-5 mr-2" />
              BUSCAR
            </Button>
          </div>

          {/* Quick Filters / Tags */}
          <div className="flex flex-wrap gap-3 mt-6 ml-4">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-1 mr-2">Filtros Pro:</span>
            {['Los Ejidos', 'Santa María del Valle', 'Castilla', 'Miraflores'].map((tag) => (
              <button key={tag} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#0040FF] transition-all">
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
