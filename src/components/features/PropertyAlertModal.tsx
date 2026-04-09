"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, MapPin, Check, Plus, Loader2, Bell } from 'lucide-react';

interface PropertyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: string;
  initialType?: string;
}

const PROPERTY_TYPES = [
  'Departamentos',
  'Casas',
  'Terrenos',
  'Oficinas',
  'Locales Comerciales',
  'Casas de Playa',
  'Casas de Campo'
];

const QUICK_CITIES = ['Piura', 'Lima', 'Trujillo', 'Arequipa', 'Chiclayo'];

export default function PropertyAlertModal({ isOpen, onClose, initialCity, initialType }: PropertyAlertModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    searchIntent: (initialType?.toLowerCase().includes('alquiler') ? 'alquiler' : 'venta') as 'venta' | 'alquiler' | 'ambos',
    propertyTypes: [] as string[],
    locations: initialCity ? [initialCity] : [] as string[]
  });

  // Manejar el cierre con Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const togglePropertyType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const addCity = (city: string) => {
    const cleanCity = city.trim();
    if (cleanCity && !formData.locations.includes(cleanCity)) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, cleanCity]
      }));
    }
  };

  const removeCity = (city: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter(c => c !== city)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.email) {
      setError("Por favor completa tus datos básicos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/subscribe-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Error al procesar la suscripción.");
      }
    } catch (err) {
      setError("Hubo un problema. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-[#0127AC]/10 p-2.5 rounded-lg">
                <Bell className="h-6 w-6 text-[#0127AC]" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-neutral-800">Alertas Casaty</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-neutral-400" />
            </button>
          </div>

          <div className="p-6 md:p-8">
            {!isSuccess ? (
              <>
                {/* Progress Bar */}
                <div className="flex gap-2 mb-8">
                  {[1, 2, 3].map(i => (
                    <div 
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#0127AC]' : 'bg-slate-100'}`}
                    />
                  ))}
                </div>

                {/* Step 1: Intención y Tipos */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800 mb-4 text-center">¿Qué estás buscando?</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {['venta', 'alquiler', 'ambos'].map((intent) => (
                          <button
                            key={intent}
                            onClick={() => setFormData(prev => ({ ...prev, searchIntent: intent as any }))}
                            className={`py-3 rounded-lg font-bold text-sm capitalize transition-all border-2 ${
                              formData.searchIntent === intent 
                                ? 'bg-[#0127AC] border-[#0127AC] text-white shadow-lg shadow-black/10' 
                                : 'bg-white border-slate-100 text-neutral-500 hover:border-slate-200'
                            }`}
                          >
                            {intent}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-neutral-800 mb-4 text-center">¿Qué propiedades te interesan?</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {PROPERTY_TYPES.map((type) => (
                          <button
                            key={type}
                            onClick={() => togglePropertyType(type)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all border-2 ${
                              formData.propertyTypes.includes(type)
                                ? 'bg-[#0127AC] border-[#0127AC] text-white'
                                : 'bg-white border-slate-100 text-neutral-500 hover:border-slate-200'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Ubicación */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-neutral-800 mb-2">¿Dónde buscas tu próximo inmueble?</h3>
                      <p className="text-neutral-400 text-sm">Puedes elegir varias zonas de interés.</p>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-3xl border border-dashed border-slate-200 min-h-[100px] flex flex-wrap gap-2 content-start">
                      {formData.locations.length === 0 && (
                        <p className="text-slate-300 text-sm w-full text-center py-4">No has añadido ubicaciones aún.</p>
                      )}
                      {formData.locations.map(city => (
                        <span 
                          key={city}
                          className="bg-white border border-slate-100 text-neutral-700 px-3 py-1.5 rounded-md text-sm font-black flex items-center gap-2 shadow-sm"
                        >
                          <MapPin className="h-3.5 w-3.5 text-[#0127AC]" />
                          {city}
                          <button onClick={() => removeCity(city)}>
                            <X className="h-3.5 w-3.5 text-neutral-400 hover:text-red-500" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center pt-4">
                      {QUICK_CITIES.filter(c => !formData.locations.includes(c)).map(city => (
                        <button
                          key={city}
                          onClick={() => addCity(city)}
                          className="px-6 py-3 rounded-lg text-[14px] font-bold text-neutral-600 bg-white border-2 border-slate-100 hover:border-[#0127AC] hover:text-[#0127AC] transition-all"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contacto */}
                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-neutral-800 mb-2">¡Para terminar!</h3>
                      <p className="text-neutral-400 text-sm">¿A dónde te enviamos las novedades?</p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[13px] font-bold text-neutral-600 ml-1">Tu primer nombre</label>
                        <input 
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          placeholder="Ej: Luis"
                          className="w-full px-4 py-4 rounded-lg border border-slate-100 focus:outline-none focus:border-[#0127AC] text-neutral-800 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[13px] font-bold text-neutral-600 ml-1">Tu mejor correo</label>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="ejemplo@email.com"
                          className="w-full px-4 py-4 rounded-lg border border-slate-100 focus:outline-none focus:border-[#0127AC] text-neutral-800 transition-all"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-[13px] font-bold flex items-center gap-2">
                        <X className="h-4 w-4" />
                        {error}
                      </div>
                    )}

                    <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                      Al suscribirte, aceptas nuestros términos de uso y políticas de privacidad. Enviaremos solo propiedades relevantes para tu búsqueda.
                    </p>
                  </motion.div>
                )}

                {/* Footer Buttons */}
                <div className="flex items-center justify-between mt-10">
                  {step > 1 ? (
                    <button 
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-2 text-neutral-400 font-bold text-sm hover:text-neutral-600 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      Atrás
                    </button>
                  ) : <div></div>}

                  <button 
                    onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-[#0127AC] text-white px-8 py-4 rounded-lg font-black text-sm shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        {step === 3 ? 'Activar Mis Alertas' : 'Siguiente'}
                        {step < 3 && <ChevronRight className="h-5 w-5" />}
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-neutral-800 mb-2">¡Suscrito con éxito!</h3>
                <p className="text-neutral-500 mb-8 leading-relaxed">
                  Ya estamos monitoreando nuevas propiedades <br /> coincidan con tus preferencias en <strong>{formData.locations.join(', ')}</strong>.
                </p>
                <button 
                  onClick={onClose}
                  className="w-full bg-[#0127AC] text-white py-4 rounded-lg font-black hover:bg-neutral-800 transition-all"
                >
                  Cerrar Ventana
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


