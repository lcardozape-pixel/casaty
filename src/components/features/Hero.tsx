'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, SlidersHorizontal, Zap, Home, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PROPERTY_TYPES = [
  { value: '', label: 'Todos los tipos' },
  { value: 'casa', label: 'Casa' },
  { value: 'depa', label: 'Departamento' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local comercial' },
];

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [operation, setOperation] = useState('venta');

  function handleSearch(overrides?: { query?: string, type?: string, op?: string }) {
    const params = new URLSearchParams();
    const finalLocation = overrides?.query !== undefined ? overrides.query : location;
    const finalType = overrides?.type !== undefined ? overrides.type : propertyType;
    const finalOp = overrides?.op !== undefined ? overrides.op : operation;

    if (finalLocation) params.set('q', finalLocation);
    if (finalType) params.set('tipo', finalType);
    if (finalOp) params.set('operacion', finalOp);

    router.push(`/propiedades?${params.toString()}`);
  }

  const tabs = [
    { id: 'venta', label: 'Comprar', icon: Building2 },
    { id: 'alquiler', label: 'Alquilar', icon: Home },
  ];

  const [showAllTags, setShowAllTags] = useState(false);
  const popularTags = [
    'Los Ejidos', 'San Eduardo', 'Santa María del Pinar', 'Quinta Ana María',
    'Miraflores', 'Miraflores Country Club', 'Santa Margarita', 'Casuarinas',
    'Centro de Piura', 'Las Palmeras (Centenario)', 'Monte Verde (Galilea)',
    'Urb. Piura', 'Santa Ana', 'Santa Isabel', 'Angamos', 'Cocos del Chipe', 'Laguna del Chipe'
  ];

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const allZones = [
    'Piura', 'Sullana', 'Talara', 'Paita', 'Castilla', 'Catacaos', 'Veintiséis de Octubre',
    'Los Ejidos', 'San Eduardo', 'Santa María del Pinar', 'Quinta Ana María',
    'Miraflores', 'Miraflores Country Club', 'Santa Margarita', 'Casuarinas',
    'Centro de Piura', 'Las Palmeras (Centenario)', 'Monte Verde (Galilea)',
    'Urb. Piura', 'Santa Ana', 'Santa Isabel', 'Angamos', 'Cocos del Chipe', 'Laguna del Chipe'
  ];

  useEffect(() => {
    if (location.length > 1) {
      const filtered = allZones.filter(zone =>
        zone.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectSuggestion = (zone: string) => {
    setLocation(zone);
    setShowSuggestions(false);
    handleSearch({ query: zone });
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        <Image
          src="/Imagenes/fondo-piura.jpg"
          alt="Piura Panorama"
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
        />
        {/* Overlay with increased opacity for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-12 w-full pt-16 pb-12 md:pt-4 md:pb-0">
        {/* Hero Copy */}
        <div className="max-w-2xl mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge - Intensified Glass Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full border border-white/30 mb-4 shadow-lg shadow-black/20"
            >
              <Zap className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">
                +1,200 Propiedades en Honecta®
              </span>
            </motion.div>
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-white mb-2.5 leading-[1.1] tracking-tight">
              El Hogar de Tus <br className="hidden md:block" /> Sueños en Piura.
            </h1>

            <p className="text-sm md:text-base text-white/90 font-medium max-w-lg leading-relaxed">
              Busca, encuentra y asegura tu próxima inversión con el respaldo legal y comercial de los expertos.
            </p>
          </motion.div>
        </div>

        {/* Search Module */}
        <motion.div
          ref={searchRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-4xl relative"
        >
          {/* Tabs */}
          <div className="flex w-full md:w-fit mb-[-1px] relative z-10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setOperation(tab.id)}
                  className={`
                    flex-1 md:flex-initial relative px-6 md:px-8 py-3 md:py-3.5 text-xs md:text-sm font-bold uppercase tracking-wide transition-all
                    first:rounded-tl-xl last:rounded-tr-xl
                    ${operation === tab.id
                      ? 'bg-white text-[#0127AC]'
                      : 'bg-white/90 text-neutral-500 hover:text-neutral-700 hover:bg-white'
                    }
                  `}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Icon className="h-4 w-4 hidden md:block" />
                    {tab.label}
                  </span>
                  {operation === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0127AC]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Body */}
          <div className="bg-white rounded-b-2xl rounded-t-none md:rounded-2xl md:rounded-tl-none p-3 md:p-2.5 shadow-xl relative z-10 flex flex-col md:flex-row gap-2">

            {/* Property Type Dropdown */}
            <div className="relative flex-1 md:max-w-[200px]">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-12 md:h-12 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-neutral-700 appearance-none focus:ring-2 focus:ring-[#0127AC]/20 focus:border-[#0127AC] outline-none transition-all cursor-pointer"
              >
                {PROPERTY_TYPES.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Location Input with Suggestions */}
            <div className="flex-[2] relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => location.length > 1 && setShowSuggestions(true)}
                placeholder="Ubicación, urbanización o distrito..."
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full h-12 md:h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:ring-2 focus:ring-[#0127AC]/20 focus:border-[#0127AC] outline-none transition-all"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-[100] max-h-[300px] overflow-y-auto"
                >
                  {filteredSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full px-5 py-3 text-left hover:bg-[#0127AC]/5 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-none"
                    >
                      <MapPin className="h-4 w-4 text-neutral-400" />
                      <span className="text-sm font-medium text-neutral-700">
                        {suggestion.split(new RegExp(`(${location})`, 'gi')).map((part, i) =>
                          part.toLowerCase() === location.toLowerCase()
                            ? <span key={i} className="font-black text-[#0127AC]">{part}</span>
                            : <span key={i}>{part}</span>
                        )}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => handleSearch()}
              className="h-12 md:h-12 px-8 bg-[#0127AC] hover:bg-[#001D8A] text-white rounded-xl font-bold text-sm uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Buscar
            </button>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-5 ml-1">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-wider mr-1">Populares:</span>

            <div className="flex flex-wrap gap-2 items-center">
              {popularTags.map((tag, index) => (
                <button
                  key={tag}
                  onClick={() => {
                    setLocation(tag);
                    handleSearch({ query: tag });
                  }}
                  className={`
                    px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white text-[10px] font-bold uppercase tracking-wide hover:bg-white hover:text-[#0127AC] transition-all shadow-lg shadow-black/5
                    ${!showAllTags && index >= 6 ? 'hidden md:flex' : 'flex'}
                  `}
                >
                  {tag}
                </button>
              ))}

              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="md:hidden px-3 py-1.5 rounded-full bg-[#0127AC]/40 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase hover:bg-[#0127AC] transition-all"
              >
                {showAllTags ? 'Ver menos -' : 'Ver más +'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
