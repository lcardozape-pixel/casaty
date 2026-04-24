'use client';

import React, { useState } from 'react';
import { X, Mail, Phone, User, Loader2, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedTime: string;
  propertyTitle: string;
  propertyId: string;
  propertyUrl: string;
  onSuccess?: () => void;
}

export default function ScheduleVisitModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  propertyTitle,
  propertyId,
  propertyUrl,
  onSuccess
}: ScheduleVisitModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Por favor completa todos los campos.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Ingresa un correo electrónico válido.");
      return false;
    }
    if (formData.phone.length < 9) {
      setError("Ingresa un número de teléfono válido.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: `+51${formData.phone.trim()}`,
            propertyId,
            propertyTitle,
            propertyUrl,
            'Visita Solicitada': 'SÍ',
            'Fecha de Visita': selectedDate?.toLocaleDateString('es-PE', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long',
              year: 'numeric'
            }),
            'visitDateISO': selectedDate?.toISOString().split('T')[0],
            'visitTimeRaw': selectedTime,
            'Hora de Visita': selectedTime
          },
          serviceName: 'Reserva de Visita'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error?.message || "Ocurrió un error al procesar tu solicitud.");
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
      
      // Auto-cerrar después de 3 segundos
      setTimeout(() => {
        onClose();
        // Reset form
        setTimeout(() => {
          setSuccess(false);
          setFormData({ name: '', email: '', phone: '' });
        }, 500);
      }, 3000);

    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = selectedDate?.toLocaleDateString('es-PE', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative h-32 bg-[#0127AC] flex flex-col items-center justify-center text-white px-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <h3 className="text-xl font-black mb-1">Finaliza tu solicitud</h3>
              <p className="text-white/80 text-sm font-medium">Estás a un paso de conocer tu próximo hogar</p>
            </div>

            <div className="p-8">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Info de la Visita */}
                  <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 mb-2 border border-slate-100">
                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0127AC]">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Fecha seleccionada</span>
                      <span className="text-[14px] font-bold text-neutral-800 capitalize">
                        {formattedDate}, {selectedTime}
                      </span>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <User className="h-5 w-5" />
                      </div>
                      <input
                        name="name"
                        type="text"
                        placeholder="Nombre completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-[15px] focus:outline-none focus:bg-white focus:border-[#0127AC]/30 transition-all text-neutral-800 placeholder:text-neutral-400"
                        required
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-[15px] focus:outline-none focus:bg-white focus:border-[#0127AC]/30 transition-all text-neutral-800 placeholder:text-neutral-400"
                        required
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex items-center">
                        <div className="absolute left-12 text-[15px] font-bold text-neutral-500 border-r border-slate-200 pr-3 mr-3">
                          +51
                        </div>
                        <input
                          name="phone"
                          type="tel"
                          placeholder="Celular"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-[95px] pr-4 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-[15px] focus:outline-none focus:bg-white focus:border-[#0127AC]/30 transition-all text-neutral-800 placeholder:text-neutral-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-bold text-center border border-red-100">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0127AC] hover:bg-[#011d8a] text-white py-4 rounded-2xl font-black text-[16px] shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      'Confirmar mi visita'
                    )}
                  </button>
                  
                  <p className="text-[11px] text-neutral-400 text-center font-medium px-4">
                    Al confirmar, aceptas nuestros términos y condiciones y el tratamiento de tus datos personales.
                  </p>
                </form>
              ) : (
                <div className="py-10 flex flex-col items-center text-center space-y-6">
                  <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-neutral-800">¡Solicitud Enviada!</h4>
                    <p className="text-neutral-500 font-medium">
                      Hemos recibido tu solicitud para el <span className="text-neutral-800 font-bold">{formattedDate}</span> a las <span className="text-neutral-800 font-bold">{selectedTime}</span>.
                    </p>
                    <p className="text-neutral-500 font-medium">
                      Un asesor de Casaty te contactará pronto para confirmar.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
