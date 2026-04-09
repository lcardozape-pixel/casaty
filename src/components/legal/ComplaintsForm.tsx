'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  FileText, 
  MessageCircle, 
  Send, 
  CheckCircle2,
  AlertCircle,
  Building2,
  CreditCard,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Step = 1 | 2 | 3 | 4;

export function ComplaintsForm() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Consumidor
    nombre: '',
    dni: '',
    domicilio: '',
    telefono: '',
    email: '',
    // Bien
    tipoBien: 'Servicio',
    monto: '',
    descripcionBien: '',
    // Reclamo
    tipoReclamo: 'Reclamo',
    detalle: '',
    pedido: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => (prev + 1) as Step);
  const prevStep = () => setStep(prev => (prev - 1) as Step);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-6 bg-white rounded-[3rem] border border-slate-100 shadow-xl max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-black text-neutral-800 mb-4 tracking-tight">¡Reclamado Registrado!</h2>
        <p className="text-neutral-500 font-medium mb-8 leading-relaxed">
          Hemos recibido tu solicitud bajo el número de hoja <span className="text-[#0127AC] font-bold">#LR-{Math.floor(Math.random() * 10000)}</span>. 
          Te hemos enviado una copia a <span className="text-neutral-800 font-bold">{formData.email}</span>. 
          Casaty te responderá en un plazo máximo de 15 días hábiles.
        </p>
        <Button size="lg" onClick={() => window.location.href = '/'} className="bg-[#0127AC]">
          Volver al Inicio
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12 flex justify-between items-center px-4 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        {[1, 2, 3].map((s) => (
          <div 
            key={s}
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 ${
              step >= s ? 'bg-[#0127AC] text-white shadow-lg shadow-blue-200' : 'bg-white border-2 border-slate-100 text-slate-300'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[3.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black text-neutral-800 mb-2 tracking-tight">1. Identificación del Consumidor</h2>
                <p className="text-neutral-400 text-sm font-medium">Tus datos personales para poder contactarte.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input required name="nombre" value={formData.nombre} onChange={handleChange} className="w-full h-14 pl-12 pr-6 bg-slate-50 border-none rounded-2xl font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all" placeholder="Ej: Juan Pérez" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">DNI / CE</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input required name="dni" value={formData.dni} onChange={handleChange} className="w-full h-14 pl-12 pr-6 bg-slate-50 border-none rounded-2xl font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all" placeholder="8 dígitos" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-14 pl-12 pr-6 bg-slate-50 border-none rounded-2xl font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all" placeholder="tu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input required name="telefono" value={formData.telefono} onChange={handleChange} className="w-full h-14 pl-12 pr-6 bg-slate-50 border-none rounded-2xl font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all" placeholder="999 999 999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">Domicilio</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input required name="domicilio" value={formData.domicilio} onChange={handleChange} className="w-full h-14 pl-12 pr-6 bg-slate-50 border-none rounded-2xl font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all" placeholder="Tu dirección" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black text-neutral-800 mb-2 tracking-tight">2. Detalle del Bien Contratado</h2>
                <p className="text-neutral-400 text-sm font-medium">Indícanos sobre qué producto o servicio es el reclamo.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex gap-4 p-2 bg-slate-50 rounded-3xl">
                   {['Producto', 'Servicio'].map((type) => (
                     <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, tipoBien: type }))}
                        className={`flex-1 h-12 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                          formData.tipoBien === type ? 'bg-white text-[#0127AC] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                     >
                       {type}
                     </button>
                   ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">Monto Reclamado (S/.)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input name="monto" value={formData.monto} onChange={handleChange} className="w-full h-14 pl-12 pr-6 bg-slate-50 border-none rounded-2xl font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all" placeholder="0.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">Descripción del Bien</label>
                  <textarea 
                    name="descripcionBien"
                    value={formData.descripcionBien}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full p-6 bg-slate-50 border-none rounded-[2rem] font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all resize-none" 
                    placeholder="Describe el inmueble o servicio contratado..." 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black text-neutral-800 mb-2 tracking-tight">3. Detalle de Reclamación</h2>
                <p className="text-neutral-400 text-sm font-medium">Cuéntanos qué sucedió y qué esperas de nosotros.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex gap-4 p-2 bg-slate-50 rounded-3xl">
                   {['Reclamo', 'Queja'].map((type) => (
                     <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, tipoReclamo: type }))}
                        className={`flex-1 h-12 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                          formData.tipoReclamo === type ? 'bg-white text-[#0127AC] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                     >
                       {type}
                     </button>
                   ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">Detalle de la Queja o Reclamo</label>
                  <textarea 
                    name="detalle"
                    value={formData.detalle}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full p-6 bg-slate-50 border-none rounded-[2rem] font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all resize-none" 
                    placeholder="Explica detalladamente lo ocurrido..." 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 ml-2">Pedido del Consumidor</label>
                  <textarea 
                    name="pedido"
                    value={formData.pedido}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full p-6 bg-slate-50 border-none rounded-[2rem] font-bold text-neutral-800 focus:ring-2 focus:ring-[#0127AC] transition-all resize-none" 
                    placeholder="¿Qué acción esperas que tome la empresa?" 
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex gap-4">
          {step > 1 && (
            <Button 
              type="button"
              variant="outline"
              size="lg"
              onClick={prevStep}
              className="flex-1 border-slate-200"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
          )}
          
          {step < 3 ? (
            <Button 
              type="button"
              size="lg"
              onClick={nextStep}
              className="flex-1 bg-[#0127AC]"
              showArrow
            >
              Siguiente
            </Button>
          ) : (
            <Button 
              type="submit"
              size="lg"
              className="flex-1 bg-[#0127AC]"
            >
              <Send className="mr-2 h-4 w-4" /> Enviar Reclamación
            </Button>
          )}
        </div>
      </form>

      {/* Footer Info */}
      <div className="mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex gap-6 items-start">
         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-none shadow-sm">
            <AlertCircle className="text-[#0127AC]" />
         </div>
         <div>
            <h4 className="font-black text-neutral-800 text-sm mb-1 uppercase tracking-tight">Importante</h4>
            <ul className="text-xs text-neutral-500 font-medium space-y-2 leading-relaxed">
              <li className="flex gap-2"><span>•</span> <span><strong>RECLAMO:</strong> Disconformidad relacionada a los productos o servicios.</span></li>
              <li className="flex gap-2"><span>•</span> <span><strong>QUEJA:</strong> Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.</span></li>
              <li className="flex gap-2"><span>•</span> <span>El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles.</span></li>
            </ul>
         </div>
      </div>
    </div>
  );
}


