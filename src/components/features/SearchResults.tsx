"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PropertyCard } from "@/components/features/PropertyCard";
import { getProperties } from "@/lib/data";
import type { Property } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";

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

const SORT_OPTIONS = [
  { value: 'recent', label: 'Más Recientes' },
  { value: 'price_asc', label: 'Menor Precio' },
  { value: 'price_desc', label: 'Mayor Precio' },
];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [location, setLocation] = useState(searchParams.get('q') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('tipo') || '');
  const [operation, setOperation] = useState(searchParams.get('operacion') || '');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
        'local': ['local', 'local comercial', 'commercial'],
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
    if (operation) {
      result = result.filter(p => 
        p.type.toLowerCase() === operation.toLowerCase()
      );
    }

    // Ordenar
    if (sortBy === 'price_asc') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
        return priceA - priceB;
      });
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
        return priceB - priceA;
      });
    }

    setFilteredProperties(result);
  }, [allProperties, location, propertyType, operation, sortBy]);

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
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* Header con Buscador estilo Honecta */}
      <section className="bg-neutral-900 text-white py-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("/Imagenes/piura-panorama.png")', backgroundSize: 'cover', backgroundPosition: 'center'}} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-black mb-2 text-center">Portal Inmobiliario</h1>
            <p className="text-slate-400 text-sm md:text-base text-center mb-8 font-medium">
              Explora oportunidades exclusivas en nuestra red de agentes aliados.
            </p>
          </motion.div>

          {/* Search Bar Honecta Style */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-full p-1.5 shadow-2xl flex items-center">
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

              {/* Property Type */}
              <div className="hidden md:block border-r border-slate-100">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 bg-transparent border-none focus:ring-0 focus:outline-none cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '28px' }}
                >
                  {PROPERTY_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Operation Type */}
              <div className="hidden md:block border-r border-slate-100">
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 bg-transparent border-none focus:ring-0 focus:outline-none cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '28px' }}
                >
                  {OPERATION_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Filters button */}
              <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filtros</span>
              </button>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-[#0040FF] hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-500/25 shrink-0"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Buscar</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-lg font-black text-neutral-800">
              {loading ? "Buscando propiedades..." : (
                <>{filteredProperties.length} Propiedades encontradas</>
              )}
            </h2>
            <p className="text-sm text-neutral-500 font-medium">
              Mostrando resultados en Perú
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold hover:bg-red-100 transition-colors"
              >
                <X className="h-3 w-3" />
                Limpiar filtros
              </button>
            )}
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-neutral-700 bg-white focus:ring-2 focus:ring-[#0040FF]/20 focus:border-[#0040FF] cursor-pointer"
            >
              {SORT_OPTIONS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="hidden md:flex border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#0040FF] text-white' : 'bg-white text-neutral-500 hover:bg-slate-50'}`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#0040FF] text-white' : 'bg-white text-neutral-500 hover:bg-slate-50'}`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "flex flex-col gap-4"
          }>
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
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-neutral-300" />
            </div>
            <h3 className="text-xl font-black text-neutral-800 mb-3">No se encontraron propiedades</h3>
            <p className="text-neutral-500 font-medium mb-6">Intenta con otros filtros o ubicación</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-[#0040FF] text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors"
            >
              Ver todas las propiedades
            </button>
          </div>
        ) : null}
        
        {loading && (
          <div className="py-20 text-center">
            <div className="animate-spin h-10 w-10 border-4 border-[#0040FF] border-t-transparent rounded-full mx-auto mb-4"></div>
            <span className="text-neutral-400 font-black">Validando inventario actualizado...</span>
          </div>
        )}
      </section>
    </main>
  );
}
