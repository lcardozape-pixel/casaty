"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check } from 'lucide-react';

interface MobileFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  operation: string;
  setOperation: (op: string) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  beds: number | null;
  setBeds: (val: number | null) => void;
  baths: number | null;
  setBaths: (val: number | null) => void;
  isExactBeds: boolean;
  setIsExactBeds: (val: boolean) => void;
  isExactBaths: boolean;
  setIsExactBaths: (val: boolean) => void;
  minArea: number | null;
  setMinArea: (val: number | null) => void;
  maxArea: number | null;
  setMaxArea: (val: number | null) => void;
  currency: 'USD' | 'PEN';
  setCurrency: (cur: 'USD' | 'PEN') => void;
  activePriceRange: { min: string; max: string; cur: string };
  onApplyPrice: (min: string, max: string, cur: string) => void;
  onClearAll: () => void;
  getPriceSuggestions: (op: string, cur: string) => number[];
  propertyTypes: { value: string; label: string }[];
}

export default function MobileFiltersModal({
  isOpen,
  onClose,
  operation,
  setOperation,
  propertyType,
  setPropertyType,
  beds,
  setBeds,
  baths,
  setBaths,
  isExactBeds,
  setIsExactBeds,
  isExactBaths,
  setIsExactBaths,
  minArea,
  maxArea,
  setMinArea,
  setMaxArea,
  currency,
  setCurrency,
  activePriceRange,
  onApplyPrice,
  onClearAll,
  getPriceSuggestions,
  propertyTypes,
}: MobileFiltersModalProps) {
  const [localMinPrice, setLocalMinPrice] = useState(activePriceRange.min);
  const [localMaxPrice, setLocalMaxPrice] = useState(activePriceRange.max);

  const handleApply = () => {
    onApplyPrice(localMinPrice, localMaxPrice, currency);
    onClose();
  };

  const isPriceDisabled = operation.toLowerCase() === 'todos';

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ y: "100%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0.5 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl bg-white flex flex-col h-full md:h-auto md:max-h-[85vh] md:rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-neutral-800 tracking-tight">Filtros Avanzados</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg transition-colors group">
            <X className="h-5 w-5 text-neutral-400 group-hover:text-neutral-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar">
          
          {/* Operación */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Operación</label>
            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              {['Venta', 'Alquiler', 'Todos'].map((op) => (
                <button
                  key={op}
                  onClick={() => setOperation(op.toLowerCase())}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                    operation.toLowerCase() === op.toLowerCase()
                      ? 'bg-white text-[#0127AC] shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Inmueble */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Tipo de inmueble</label>
            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-11 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-neutral-700 appearance-none outline-none focus:border-[#0127AC] transition-all"
              >
                <option value="Todos">Todos los tipos</option>
                {propertyTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Precio */}
          <div className={`space-y-4 transition-all duration-300 ${isPriceDisabled ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Rango de Precio</label>
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setCurrency('PEN')}
                  className={`px-4 py-1 rounded-md text-[10px] font-bold transition-all ${currency === 'PEN' ? 'bg-white text-[#0127AC] shadow-sm' : 'text-neutral-500'}`}
                >
                  Soles
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-1 rounded-md text-[10px] font-bold transition-all ${currency === 'USD' ? 'bg-white text-[#0127AC] shadow-sm' : 'text-neutral-500'}`}
                >
                  Dólares
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="relative">
                <select
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                  className="w-full h-11 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-neutral-700 appearance-none outline-none focus:border-[#0127AC] transition-all"
                >
                  <option value="">Precio Mín</option>
                  {getPriceSuggestions(operation, currency).map(v => (
                    <option key={`min-${v}`} value={v.toString()}>
                      {currency === 'USD' ? '$' : 'S/'} {v.toLocaleString()}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <span className="absolute -top-2 left-3 bg-white px-1.5 text-[9px] font-bold text-[#0127AC] z-10 leading-none">Desde</span>
              </div>
              <div className="relative">
                <select
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                  className="w-full h-11 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-neutral-700 appearance-none outline-none focus:border-[#0127AC] transition-all"
                >
                  <option value="">Precio Máx</option>
                  {getPriceSuggestions(operation, currency).map(v => (
                    <option key={`max-${v}`} value={v.toString()}>
                      {currency === 'USD' ? '$' : 'S/'} {v.toLocaleString()}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <span className="absolute -top-2 left-3 bg-white px-1.5 text-[9px] font-bold text-[#0127AC] z-10 leading-none">Hasta</span>
              </div>
            </div>
            {isPriceDisabled && (
              <p className="text-[10px] font-bold text-[#0127AC] bg-[#F0F7FF] px-3 py-1.5 rounded-lg inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#0127AC] animate-pulse" />
                Desactivado en modo "Todos"
              </p>
            )}
          </div>

          {/* Dormitorios */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Dormitorios</label>
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={`beds-${num}`}
                  onClick={() => setBeds(beds === num ? null : num)}
                  className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${
                    beds === num 
                      ? 'bg-white text-[#0127AC] shadow-sm border border-slate-100' 
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {num}{num === 5 ? '+' : '+'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2.5 ml-1 group cursor-pointer" onClick={() => setIsExactBeds(!isExactBeds)}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isExactBeds ? 'bg-[#0127AC] border-[#0127AC]' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                {isExactBeds && <Check className="h-3.5 w-3.5 text-white" />}
              </div>
              <span className="text-[11px] font-bold text-neutral-500 select-none">Cantidad exacta</span>
            </div>
          </div>

          {/* Baños */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Baños</label>
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={`baths-${num}`}
                  onClick={() => setBaths(baths === num ? null : num)}
                  className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${
                    baths === num 
                      ? 'bg-white text-[#0127AC] shadow-sm border border-slate-100' 
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {num}{num === 5 ? '+' : '+'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2.5 ml-1 group cursor-pointer" onClick={() => setIsExactBaths(!isExactBaths)}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isExactBaths ? 'bg-[#0127AC] border-[#0127AC]' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                {isExactBaths && <Check className="h-3.5 w-3.5 text-white" />}
              </div>
              <span className="text-[11px] font-bold text-neutral-500 select-none">Cantidad exacta</span>
            </div>
          </div>

          {/* Áreas */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Superficie (m²)</label>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Ej: 80"
                  value={minArea || ''}
                  onChange={(e) => setMinArea(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-neutral-700 outline-none focus:border-[#0127AC] transition-all"
                />
                <span className="absolute -top-2 left-3 bg-white px-1.5 text-[9px] font-bold text-[#0127AC] z-10 leading-none">Total Mín</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Ej: 250"
                  value={maxArea || ''}
                  onChange={(e) => setMaxArea(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-neutral-700 outline-none focus:border-[#0127AC] transition-all"
                />
                <span className="absolute -top-2 left-3 bg-white px-1.5 text-[9px] font-bold text-[#0127AC] z-10 leading-none">Total Máx</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Buttons */}
        <div className="flex-shrink-0 p-6 bg-white border-t border-slate-100 flex items-center gap-4">
          <button
            onClick={() => {
              onClearAll();
              setLocalMinPrice('');
              setLocalMaxPrice('');
              onClose();
            }}
            className="flex-1 py-3.5 bg-white border border-slate-200 text-neutral-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
          >
            Limpiar filtros
          </button>
          <button
            onClick={handleApply}
            className="flex-[1.2] py-3.5 bg-[#0127AC] text-white rounded-xl text-xs font-bold active:scale-95 transition-all shadow-lg shadow-[#0127AC]/10 hover:bg-[#001D8B]"
          >
            Aplicar Cambios
          </button>
        </div>
      </motion.div>
    </div>
  );
}
