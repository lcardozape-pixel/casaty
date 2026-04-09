'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, SlidersHorizontal, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PROPERTY_TYPES = [
  { value: '', label: 'Cualquiera' },
  { value: 'casa', label: 'Casa' },
  { value: 'depa', label: 'Depa' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local comercial' },
];

const OPERATION_TYPES = [
  { value: '', label: 'Todas las Operaciones' },
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
];

function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder 
}: { 
  options: { value: string; label: string }[]; 
  value: string; 
  onChange: (val: string) => void; 
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors whitespace-nowrap"
      >
        <span className="truncate max-w-[120px]">{selectedLabel}</span>
        <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                value === option.value 
                  ? 'text-[#0127AC] bg-slate-50 font-semibold' 
                  : 'text-neutral-700 hover:bg-slate-50 font-medium'
              }`}
            >
              {value === option.value && (
                <svg className="h-4 w-4 text-[#0127AC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [operation, setOperation] = useState('');

  function handleSearch() {
    const params = new URLSearchParams();
    if (location) params.set('q', location);
    if (propertyType) params.set('tipo', propertyType);
    if (operation) params.set('operacion', operation);
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <section className="relative min-h-[750px] md:h-[700px] flex items-start md:items-center justify-center overflow-hidden pt-18 pb-32 md:pt-0 md:pb-0">
      {/* Background */}
      <div className="absolute inset-0 z-0 shimmer" suppressHydrationWarning>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10" />
        <Image
          src="/Imagenes/fondo-piura.jpg"
          alt="Piura Modern Panorama"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-4xl mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 w-fit mb-4">
              <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Más de 1,200 Propiedades en la red Honecta®</span>
            </div>

            <h1 className="text-3xl md:text-6xl font-black text-white mb-6 leading-[1] tracking-tighter">
              El Hogar de Tus <br /> Sueños en Piura.
            </h1>
            <p className="text-sm md:text-xl text-white/80 font-medium max-w-xl leading-relaxed">
              Busca, encuentra y asegura tu próxima inversión con el respaldo legal y comercial de los expertos.
            </p>
          </motion.div>
        </div>

        {/* Search Bar - Honecta Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="lg:max-w-5xl"
        >
          <div className="bg-white/90 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl shadow-black/10 flex items-center border border-white/20">
            {/* Location Input */}
            <div className="flex-1 min-w-0 flex items-center gap-3 px-5 py-2 border-r border-slate-100">
              <MapPin className="h-4 w-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ubicación, distrito o calle..."
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-transparent border-none p-0 font-medium text-neutral-700 placeholder:text-neutral-400 focus:ring-0 focus:outline-none text-sm"
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="hidden md:flex border-r border-slate-100">
              <CustomDropdown
                options={PROPERTY_TYPES}
                value={propertyType}
                onChange={setPropertyType}
                placeholder="Cualquiera"
              />
            </div>

            {/* Operation Type Dropdown */}
            <div className="hidden md:flex border-r border-slate-100">
              <CustomDropdown
                options={OPERATION_TYPES}
                value={operation}
                onChange={setOperation}
                placeholder="Todas las..."
              />
            </div>

            {/* Filters Button */}
            <button
              type="button"
              onClick={() => {/* TODO: modal filtros avanzados */}}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors border-r border-slate-100"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filtros</span>
            </button>

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center gap-2 bg-[#0127AC] hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-black/10 shrink-0 ml-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Buscar Propiedad</span>
            </button>
          </div>

          {/* Mobile Filters Row */}
          <div className="flex md:hidden gap-2 mt-3">
            <div className="flex-1 bg-white/90 backdrop-blur-xl rounded-xl px-4 py-3 shadow-lg border border-white/20">
              <CustomDropdown
                options={PROPERTY_TYPES}
                value={propertyType}
                onChange={setPropertyType}
                placeholder="Tipo"
              />
            </div>
            <div className="flex-1 bg-white/90 backdrop-blur-xl rounded-xl px-4 py-3 shadow-lg border border-white/20">
              <CustomDropdown
                options={OPERATION_TYPES}
                value={operation}
                onChange={setOperation}
                placeholder="Operación"
              />
            </div>
          </div>

          {/* Quick Filters / Tags */}
          <div className="flex flex-wrap gap-3 mt-6 ml-4">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-1 mr-2">Populares:</span>
            {['Los Ejidos', 'Santa María del Valle', 'Castilla', 'Miraflores'].map((tag) => (
              <button 
                key={tag} 
                onClick={() => { setLocation(tag); handleSearch(); }}
                className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#0127AC] transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


