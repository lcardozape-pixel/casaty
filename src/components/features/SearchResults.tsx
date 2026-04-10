"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PropertyCard } from "@/components/features/PropertyCard";
import { getProperties } from "@/lib/data";
import type { Property } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, X, Bell, List, Map as MapIcon, ChevronDown, ChevronUp, Menu, ArrowUpRight, Square } from "lucide-react";
import PropertyAlertModal from "@/components/features/PropertyAlertModal";
import MobileFiltersModal from "@/components/features/MobileFiltersModal";
import { PropertyMap } from "@/components/features/PropertyMap";
import { AnimatePresence } from "framer-motion";

const PRICE_RANGES = [
  { value: '', label: 'Precio' },
  { value: '0-100000', label: 'Hasta $100,000' },
  { value: '100000-300000', label: '$100k - $300k' },
  { value: '300000-500000', label: '$300k - $500k' },
  { value: '500000-', label: 'Más de $500k' },
];

const PROPERTY_TYPES = [
  { value: '', label: 'Cualquiera' },
  { value: 'casa', label: 'Casa' },
  { value: 'depa', label: 'Departamento' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local_comercial', label: 'Local Comercial' },
  { value: 'local_industrial', label: 'Local Industrial' },
];

const OPERATION_TYPES = [
  { value: 'Todos', label: 'Todos' },
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'newest', label: 'Publicaciones nuevas' },
  { value: 'oldest', label: 'Publicaciones antiguas' },
  { value: 'price_desc', label: 'Precio: Alto a bajo' },
  { value: 'price_asc', label: 'Precio: Bajo a alto' },
  { value: 'price_m2_desc', label: 'Precio por m2: Alto a bajo' },
  { value: 'price_m2_asc', label: 'Precio por m2: Bajo a alto' },
  { value: 'area_desc', label: 'Área: Alto a bajo' },
  { value: 'area_asc', label: 'Área: Bajo a alto' },
];

function getPriceSuggestions(operation: string, currency: string) {
  if (operation === 'alquiler') {
    return currency === 'USD' 
      ? [100, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 10000]
      : [500, 1500, 2000, 3000, 4000, 5000, 7500, 10000, 15000, 20000];
  }
  // Venta o por defecto
  return currency === 'USD'
    ? [5000, 50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000, 2000000]
    : [10000, 150000, 300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000];
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [location, setLocation] = useState(searchParams.get('q') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('tipo') || '');
  const [operation, setOperation] = useState(searchParams.get('operacion') || 'venta');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filtros Avanzados (Nuevos)
  const [beds, setBeds] = useState<number | null>(null);
  const [baths, setBaths] = useState<number | null>(null);
  const [isExactBeds, setIsExactBeds] = useState(false);
  const [isExactBaths, setIsExactBaths] = useState(false);
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [minBuiltArea, setMinBuiltArea] = useState<number | null>(null);
  const [maxBuiltArea, setMaxBuiltArea] = useState<number | null>(null);

  // Filtro de Precio Avanzado
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [currency, setCurrency] = useState<'USD' | 'PEN'>('PEN');
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [activePriceRange, setActivePriceRange] = useState({ min: '', max: '', cur: 'PEN' });
  const priceDropdownRef = React.useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setShowPriceDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cargar propiedades al montar
  useEffect(() => {
    async function load() {
      try {
        const props = await getProperties();
        setAllProperties(props);
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filtrar cuando cambian los filtros o las propiedades
  useEffect(() => {
    let result = [...allProperties];

    // Filtro por ubicación
    if (location) {
      const q = location.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.address && p.address.toLowerCase().includes(q)) ||
        (p.district && p.district.toLowerCase().includes(q)) ||
        (p.city && p.city.toLowerCase().includes(q))
      );
    }

    // Filtro por tipo de propiedad
    if (propertyType) {
      const typeMap: Record<string, string[]> = {
        'casa': ['casa', 'house'],
        'depa': ['depa', 'departamento', 'apartment'],
        'oficina': ['oficina', 'office'],
        'terreno': ['terreno', 'land'],
        'local_comercial': ['local comercial', 'commercial'],
        'local_industrial': ['local industrial', 'industrial', 'warehouse', 'bodega', 'almacen'],
      };
      const matchTerms = typeMap[propertyType] || [propertyType];
      result = result.filter(p => 
        matchTerms.some(term => 
          (p.propertyType && p.propertyType.toLowerCase().includes(term)) ||
          p.title.toLowerCase().includes(term)
        )
      );
    }

    // Filtro por operación
    if (operation && operation !== 'Todos') {
      result = result.filter(p => 
        p.type.toLowerCase() === operation.toLowerCase()
      );
    }

    // Filtro por Precio Avanzado (Desactivado si es 'Todos')
    if (operation !== 'Todos' && (activePriceRange.min || activePriceRange.max)) {
      const min = parseFloat(activePriceRange.min) || 0;
      const max = parseFloat(activePriceRange.max) || Infinity;
      
      result = result.filter(p => {
        const pPrice = activePriceRange.cur === 'PEN' ? (p.priceAmount || 0) : (p.priceAltAmount || 0);
        return pPrice >= min && pPrice <= max;
      });
    }

    // Filtros Avanzados Adicionales
    if (beds !== null) {
      result = result.filter(p => isExactBeds ? p.beds === beds : p.beds >= beds);
    }
    if (baths !== null) {
      result = result.filter(p => isExactBaths ? p.baths === baths : p.baths >= baths);
    }

    // Área Total (basada en sqft o parsing de area si sqft no está disponible)
    if (minArea !== null || maxArea !== null) {
      result = result.filter(p => {
        const aVal = parseFloat((p.sqft || 0).toString());
        if (minArea !== null && aVal < minArea) return false;
        if (maxArea !== null && aVal > maxArea) return false;
        return true;
      });
    }

    // Ordenar
    // Sorting Logic
    const getAreaNum = (areaStr: string) => parseFloat(areaStr.replace(/[^0-9.]/g, '')) || 0;

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.priceAmount - b.priceAmount);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.priceAmount - a.priceAmount);
    } else if (sortBy === 'area_asc') {
      result.sort((a, b) => getAreaNum(a.area) - getAreaNum(b.area));
    } else if (sortBy === 'area_desc') {
      result.sort((a, b) => getAreaNum(b.area) - getAreaNum(a.area));
    } else if (sortBy === 'price_m2_asc') {
      result.sort((a, b) => (a.priceAmount / getAreaNum(a.area)) - (b.priceAmount / getAreaNum(b.area)));
    } else if (sortBy === 'price_m2_desc') {
      result.sort((a, b) => (b.priceAmount / getAreaNum(b.area)) - (a.priceAmount / getAreaNum(a.area)));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id.localeCompare(a.id)); // Fallback a ID si no hay fecha
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => a.id.localeCompare(b.id)); 
    }

    setFilteredProperties(result);
  }, [allProperties, location, propertyType, operation, sortBy, activePriceRange, beds, baths, isExactBeds, isExactBaths, minArea, maxArea]);

  function handleSearch() {
    const params = new URLSearchParams();
    if (location) params.set('q', location);
    if (propertyType) params.set('tipo', propertyType);
    if (operation) params.set('operacion', operation);
    router.push(`/propiedades?${params.toString()}`);
  }

  function clearFilters() {
    setLocation('');
    setPropertyType('');
    setOperation('');
    setSortBy('recent');
    router.push('/propiedades');
  }

  const hasActiveFilters = !!(location || propertyType || operation);

  return (
    <main className={`flex flex-col bg-white ${viewMode === 'map' ? 'fixed inset-0 z-[100] overflow-hidden' : 'min-h-screen'}`}>
      {/* Header con Filtros Premium estilo Imagen */}
      <section className={`bg-white px-4 md:px-6 lg:px-12 border-b border-slate-100 z-50 ${viewMode === 'map' ? 'py-3 shadow-sm' : 'py-4 md:py-6 sticky top-0'}`}>
        <div className="max-w-7xl mx-auto">
          
          {/* VERSION MOVIL (3 Niveles) */}
          <div className="md:hidden space-y-4">
            {/* Fila 1: Buscador (Logo y Menu eliminados por redundancia) */}
            <div className="w-full relative">
              <div className="flex items-center gap-2 px-3 h-11 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#0127AC]/10 transition-all">
                <Search className="h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Buscar por distrito"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-transparent border-none p-0 w-full text-xs font-semibold text-neutral-700 placeholder:text-neutral-400 focus:ring-0 outline-none"
                />
              </div>
            </div>

            {/* Fila 2: Filtros + Vista + Alerta */}
            <div className="flex items-center justify-between gap-2">
              <button 
                onClick={() => setIsFilterModalOpen(true)}
                className="flex-1 flex items-center justify-between px-4 h-10 bg-white border border-slate-200 rounded-xl text-xs font-bold text-neutral-600"
              >
                <span>Filtros</span>
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </button>
              
              <div className="flex bg-slate-100 p-0.5 h-10 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#0127AC]' : 'text-neutral-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-[#0127AC]' : 'text-neutral-400'}`}
                >
                  <MapIcon className="h-4 w-4" />
                </button>
              </div>

              <button 
                onClick={() => setIsAlertModalOpen(true)}
                className="w-10 h-10 flex items-center justify-center bg-white border-[1.5px] border-[#0127AC] rounded-xl text-[#0127AC]"
              >
                <Bell className="h-4 w-4" />
              </button>
            </div>

            {/* Fila 3: Título + Sort */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 border-t border-slate-50 pt-3">
              <h2 className="text-[11px] font-black text-neutral-800 uppercase tracking-tight min-w-0 flex-1">
                {(() => {
                  const typeMap: Record<string, string> = {
                    'casa': 'Casas',
                    'depa': 'Departamentos',
                    'oficina': 'Oficinas',
                    'terreno': 'Terrenos',
                    'local_comercial': 'Locales Comerciales',
                    'local_industrial': 'Locales Industriales',
                    '': 'Propiedades'
                  };
                  const type = typeMap[propertyType] || 'Propiedades';
                  const op = operation === 'alquiler' ? 'en alquiler' : operation === 'venta' ? 'en venta' : 'en venta/alquiler';
                  const loc = location ? ` en ${location}` : '';
                  return `${type} ${op}${loc}`;
                })()}
              </h2>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-3 pr-8 h-8 bg-white border border-slate-200 rounded-lg text-xs font-bold text-neutral-500 appearance-none outline-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
                >
                  {SORT_OPTIONS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* VERSION ESCRITORIO (Existente Refactorizada) */}
          <div className="hidden md:block space-y-6">
            {/* Fila 1: Filtros estilo Pill */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Ubicación Integrada (Primera Posición) */}
                <div className="relative group">
                  <div className="flex items-center gap-2 px-4 h-11 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#0127AC]/10 focus-within:border-[#0127AC] transition-all min-w-[200px]">
                    <MapPin className="h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Piura, Perú..."
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="bg-transparent border-none p-0 w-full text-sm font-semibold text-neutral-700 placeholder:text-neutral-400 focus:ring-0 outline-none"
                    />
                    {location && (
                      <button onClick={() => setLocation('')} className="p-1 hover:bg-slate-200 rounded-full">
                        <X className="h-3 w-3 text-neutral-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Operación */}
                <div className="relative">
                  <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="pl-4 pr-10 h-11 bg-[#F0F7FF] border border-[#D0E7FF] rounded-xl text-sm font-semibold text-[#0127AC] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0127AC]/10 transition-all"
                  >
                    {OPERATION_TYPES.map(op => (
                      <option key={op.value} value={op.value}>{op.label === 'Todas las Operaciones' ? 'Operación' : op.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0127AC] pointer-events-none" />
                </div>

                {/* Tipo de Inmueble */}
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="pl-4 pr-10 h-11 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-neutral-600 appearance-none cursor-pointer hover:border-[#0127AC]/30 focus:outline-none focus:ring-2 focus:ring-[#0127AC]/10 transition-all"
                  >
                    {PROPERTY_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label === 'Cualquiera' ? 'Departamento' : t.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                </div>

                {/* Selector de Precio Avanzado */}
                <div className="relative" ref={priceDropdownRef}>
                  <button 
                    onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                    className={`flex items-center gap-2 px-4 h-11 border rounded-xl text-sm font-semibold transition-all ${
                      showPriceDropdown || activePriceRange.min || activePriceRange.max
                        ? 'bg-[#F0F7FF] border-[#D0E7FF] text-[#0127AC]'
                        : 'bg-white border-slate-200 text-neutral-600 hover:border-[#0127AC]/30'
                    }`}
                  >
                    <span>
                      {activePriceRange.min || activePriceRange.max 
                        ? `${activePriceRange.cur === 'USD' ? '$' : 'S/'} ${activePriceRange.min || '0'} - ${activePriceRange.max || 'Máx'}`
                        : 'Precio'}
                    </span>
                    {showPriceDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  <AnimatePresence>
                    {showPriceDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-[320px] bg-white rounded-2xl shadow-xl border border-slate-100 p-5 z-50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-bold text-neutral-700">Precio:</span>
                          <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button 
                              onClick={() => setCurrency('PEN')}
                              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${currency === 'PEN' ? 'bg-white text-[#0127AC] shadow-sm' : 'text-neutral-500'}`}
                            >
                              Soles
                            </button>
                            <button 
                              onClick={() => setCurrency('USD')}
                              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${currency === 'USD' ? 'bg-white text-[#0127AC] shadow-sm' : 'text-neutral-500'}`}
                            >
                              Dólares
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider ml-1">Mínimo</label>
                            <div className="relative">
                              <select 
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full h-11 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-neutral-600 appearance-none focus:outline-none focus:border-[#0127AC] transition-all"
                              >
                                <option value="">No Min</option>
                                {getPriceSuggestions(operation, currency).map(v => (
                                  <option key={`min-${v}`} value={v.toString()}>
                                    {currency === 'USD' ? '$' : 'S/'} {v.toLocaleString()}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider ml-1">Máximo</label>
                            <div className="relative">
                              <select 
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full h-11 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-neutral-600 appearance-none focus:outline-none focus:border-[#0127AC] transition-all"
                              >
                                <option value="">No Max</option>
                                {getPriceSuggestions(operation, currency).map(v => (
                                  <option key={`max-${v}`} value={v.toString()}>
                                    {currency === 'USD' ? '$' : 'S/'} {v.toLocaleString()}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setActivePriceRange({ min: minPrice, max: maxPrice, cur: currency });
                            setShowPriceDropdown(false);
                          }}
                          className="w-full py-3 bg-[#0127AC] text-white rounded-xl text-sm font-black hover:bg-[#001D8B] transition-all shadow-lg active:scale-[0.98]"
                        >
                          Aplicar Filtro
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Más Filtros */}
                <button 
                  onClick={() => setIsFilterModalOpen(true)}
                  className="flex items-center gap-2 px-4 h-11 bg-white border border-slate-200 rounded-xl text-sm font-bold text-neutral-600 hover:bg-slate-50 transition-all"
                >
                  <span>Filtros</span>
                  <SlidersHorizontal className="h-4 w-4" />
                </button>

              </div>

              {/* Toggle de Vista (SUBIDO A FILA 1) */}
              <div className="flex bg-slate-100 p-1 h-11 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-5 h-full rounded-lg text-xs font-black transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-[#0127AC] shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                  Ver listado
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-5 h-full rounded-lg text-xs font-black transition-all ${
                    viewMode === 'map' 
                      ? 'bg-white text-[#0127AC] shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  <MapIcon className="h-3.5 w-3.5" />
                  Ver mapa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className={`w-full ${viewMode === 'map' ? 'flex-1 relative overflow-hidden bg-white' : 'px-6 lg:px-12 py-10 min-h-[600px]'}`}>
        <div className={viewMode === 'map' ? "absolute inset-0" : "max-w-7xl mx-auto"}>
          
          {/* Mobile Count - Centered and full width as requested */}
          {viewMode === 'grid' && (
            <div className="md:hidden flex justify-center mb-8 px-4">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                Se encontraron <span className="text-[#0127AC]">{filteredProperties.length}</span> propiedades disponibles
              </p>
            </div>
          )}

          {/* Header de Resultados (Solo en modo Grid) - Hidden on Mobile due to redundancy */}
          {viewMode === 'grid' && (
            <div className="hidden md:flex flex-row items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-lg md:text-xl font-black text-neutral-800 tracking-tight leading-tight">
                  {(() => {
                    const typeMap: Record<string, string> = {
                      'casa': 'Casas',
                      'depa': 'Departamentos',
                      'oficina': 'Oficinas',
                      'terreno': 'Terrenos',
                      'local_comercial': 'Locales Comerciales',
                      'local_industrial': 'Locales Industriales',
                      '': 'Propiedades'
                    };
                    const type = typeMap[propertyType] || 'Propiedades';
                    const op = operation === 'alquiler' ? 'en alquiler' : operation === 'venta' ? 'en venta' : 'en venta o alquiler';
                    const loc = location ? `en ${location}` : 'en Perú';
                    return `${type} ${op} ${loc}`;
                  })()}
                </h1>
                <p className="text-slate-500 text-[10px] md:text-xs font-bold mt-1 uppercase tracking-wider">
                  Se encontraron <span className="text-[#0127AC]">{filteredProperties.length}</span> propiedades disponibles
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsAlertModalOpen(true)}
                  className="flex items-center gap-2 px-6 h-12 bg-white border-[1.5px] border-[#0127AC] rounded-xl text-sm font-black text-[#0127AC] hover:bg-[#0127AC]/5 transition-all shadow-sm"
                >
                  <span>Crear alerta</span>
                  <Bell className="h-4 w-4" />
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-5 pr-12 h-12 bg-white border border-slate-200 rounded-xl text-sm font-bold text-neutral-500 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0127AC]/10 transition-all outline-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                >
                  {SORT_OPTIONS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          
          {/* List Section (Solo en modo Grid) */}
          {viewMode === 'grid' && (
            <div className="w-full">
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((property, i) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </div>
              ) : !loading ? (
                <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-neutral-300" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-800 mb-3">No se encontraron propiedades</h3>
                  <p className="text-neutral-500 font-medium mb-6">Intenta con otros filtros o ubicación</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2.5 bg-[#0127AC] text-white rounded-lg font-bold text-sm hover:bg-neutral-800 transition-colors"
                  >
                    Ver todas las propiedades
                  </button>
                </div>
              ) : null}

              {loading && (
                <div className="py-20 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0127AC] mx-auto mb-4"></div>
                  <p className="text-neutral-500 font-medium">Buscando propiedades...</p>
                </div>
              )}
            </div>
          )}

          {/* Full Width Map View */}
          {viewMode === 'map' && (
            <div className="absolute inset-0 z-0">
              <PropertyMap 
                properties={filteredProperties} 
                onPropertyClick={(p) => setSelectedPropertyId(p.id)}
                selectedProperty={filteredProperties.find(p => p.id === selectedPropertyId)}
              />

              {/* Botones Flotantes de Control sobre el Mapa (Unificados) */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-white p-1.5 rounded-2xl shadow-2xl border border-slate-100">
                <div className="hidden md:flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsAlertModalOpen(true)}
                    className="flex items-center gap-2 px-4 h-10 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-neutral-600 hover:bg-slate-100 transition-all uppercase tracking-tight"
                  >
                    <Bell className="h-3.5 w-3.5" />
                    Alerta
                  </button>
                  <div className="h-6 w-[1px] bg-slate-200 mx-1" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-3 pr-10 h-10 bg-transparent border-none text-[10px] font-black text-neutral-600 outline-none cursor-pointer appearance-none uppercase tracking-tight"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
                  >
                    {SORT_OPTIONS.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <div className="h-6 w-[1px] bg-slate-200 mx-1" />
                </div>
              </div>

              {/* Quick View Sidebar - Centrado Vertical Robusto con Flex */}
              <AnimatePresence>
                {selectedPropertyId && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="absolute top-0 bottom-0 left-6 z-20 flex items-center w-[calc(100%-48px)] md:w-[380px] max-w-full pointer-events-none"
                  >
                    <div className="bg-white w-full h-auto max-h-[580px] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col group pointer-events-auto">
                      {/* Imagen con Altura Fija */}
                      <div className="relative h-64 flex-none overflow-hidden">
                        {filteredProperties.find(p => p.id === selectedPropertyId)?.image && (
                          <img 
                            src={filteredProperties.find(p => p.id === selectedPropertyId)?.image} 
                            alt="Vista rápida" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <button 
                          onClick={() => setSelectedPropertyId(null)}
                          className="absolute top-4 right-4 h-9 w-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-800 shadow-lg hover:bg-[#0127AC] hover:text-white transition-all z-10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                           <div className="bg-[#0127AC] text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-xl">
                             {filteredProperties.find(p => p.id === selectedPropertyId)?.type?.toUpperCase() || ''}
                           </div>
                           <div className="bg-neutral-900/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                             {filteredProperties.find(p => p.id === selectedPropertyId)?.propertyType?.toUpperCase() || ''}
                           </div>
                        </div>
                      </div>

                      {/* Contenido con Distribución Fija */}
                      <div className="p-5 flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-black text-[#0127AC]">
                            {filteredProperties.find(p => p.id === selectedPropertyId)?.price}
                          </span>
                        </div>
                        
                        <h3 className="text-neutral-800 font-black text-lg mb-1 leading-tight line-clamp-2 flex-none">
                          {filteredProperties.find(p => p.id === selectedPropertyId)?.title || ''}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-bold mb-4 flex-none">
                          <MapPin className="h-4 w-4 text-[#0127AC]/50" />
                          <span className="line-clamp-1">{filteredProperties.find(p => p.id === selectedPropertyId)?.location || ''}</span>
                        </div>

                        {/* Características destacadas - Siempre en el mismo lugar */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                           <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-2 text-[#0127AC] mb-1">
                                <Square className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-wider">Área</span>
                              </div>
                              <span className="text-sm font-bold text-neutral-700">{filteredProperties.find(p => p.id === selectedPropertyId)?.area}</span>
                           </div>
                           <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-2 text-[#0127AC] mb-1">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-wider">Estado</span>
                              </div>
                              <span className="text-sm font-bold text-neutral-700">Disponible</span>
                           </div>
                        </div>

                        <button 
                          onClick={() => router.push(`/propiedades/${filteredProperties.find(p => p.id === selectedPropertyId)?.slug || selectedPropertyId}`)}
                          className="w-full mt-2 py-3.5 bg-neutral-900 text-white rounded-2xl text-[11px] font-black hover:bg-[#0127AC] shadow-xl shadow-black/10 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          VER DETALLES COMPLETOS
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
      <PropertyAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        initialCity={location}
        initialType={operation}
      />
      <AnimatePresence>
        {isFilterModalOpen && (
          <MobileFiltersModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            operation={operation}
            setOperation={setOperation}
            propertyType={propertyType || 'Todos'}
            setPropertyType={setPropertyType}
            beds={beds}
            setBeds={setBeds}
            baths={baths}
            setBaths={setBaths}
            isExactBeds={isExactBeds}
            setIsExactBeds={setIsExactBeds}
            isExactBaths={isExactBaths}
            setIsExactBaths={setIsExactBaths}
            minArea={minArea}
            setMinArea={setMinArea}
            maxArea={maxArea}
            setMaxArea={setMaxArea}
            currency={currency}
            setCurrency={setCurrency}
            activePriceRange={activePriceRange}
            onApplyPrice={(min, max, cur) => setActivePriceRange({ min, max, cur })}
            onClearAll={clearFilters}
            getPriceSuggestions={getPriceSuggestions}
            propertyTypes={PROPERTY_TYPES.filter(t => t.value !== '')}
          />
        )}
      </AnimatePresence>
    </main>
  );
}


