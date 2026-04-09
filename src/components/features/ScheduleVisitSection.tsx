'use client';

import React, { useState, useRef } from 'react';
import { Calendar, Clock, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ScheduleVisitSectionProps {
  onSchedule: (date: Date, time: string, moveTime: string) => void;
}

export function ScheduleVisitSection({ onSchedule }: ScheduleVisitSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMoveTime, setSelectedMoveTime] = useState("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const upcomingDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      onSchedule(selectedDate, selectedTime, selectedMoveTime);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-[#0127AC]/10 rounded-lg flex items-center justify-center text-[#0127AC]">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-black text-neutral-800">Agenda una visita</h3>
          <p className="text-sm text-neutral-500 font-medium tracking-tight">Conoce el inmueble en persona o por videollamada</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Lado Izquierdo - Formulario */}
        <div className="space-y-8">
          {/* Carrusel de Fechas */}
          <div className="relative group">
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-slate-600 border border-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x px-1"
            >
              {upcomingDates.map((date, idx) => {
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
                const dayNum = date.getDate();
                const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
                const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
                const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "flex flex-col items-center justify-center min-w-[72px] h-[92px] rounded-2xl border transition-all snap-start",
                      isSelected 
                        ? "bg-[#0127AC] border-[#0127AC] text-white shadow-lg shadow-blue-500/20" 
                        : "bg-white border-slate-100 text-neutral-400 hover:border-slate-300"
                    )}
                  >
                    <span className={cn("text-[11px] font-bold mb-1 opacity-80")}>
                      {capitalizedDay.replace('.', '')}
                    </span>
                    <span className="text-xl font-black mb-0.5 leading-none">{dayNum}</span>
                    <span className="text-[11px] font-bold opacity-80">{capitalizedMonth.replace('.', '')}</span>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => scroll('right')}
               className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-slate-600 border border-slate-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Selectores */}
          <div className="space-y-4">
            {/* Hora */}
            <div className="relative">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-xl px-5 py-3.5 text-[14px] font-medium text-neutral-600 appearance-none cursor-pointer focus:outline-none focus:border-slate-300 transition-all hover:border-slate-200"
              >
                <option value="">Seleccionar hora</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
              <Clock className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
            </div>

            {/* Mudanza */}
            <div className="relative">
              <select
                value={selectedMoveTime}
                onChange={(e) => setSelectedMoveTime(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-xl px-5 py-3.5 text-[14px] font-medium text-neutral-600 appearance-none cursor-pointer focus:outline-none focus:border-slate-300 transition-all hover:border-slate-200"
              >
                <option value="">¿Cuándo deseas mudarte?</option>
                <option value="Inmediatamente">Inmediatamente</option>
                <option value="30 días">Aproximadamente en 30 días</option>
                <option value="60 días">En los próximos 60 días</option>
                <option value="Más de 90 días">En más de 3 meses</option>
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
            </div>
          </div>

          {/* Botón */}
          <div className="space-y-4 pt-2 text-center">
            <button 
              onClick={handleSchedule}
              className="w-full bg-[#0127AC] hover:bg-[#011d8a] text-white py-3.5 rounded-lg font-bold text-[15px] shadow-sm transition-all active:scale-[0.98]"
            >
              Solicitar visita
            </button>
            <p className="text-[12px] text-neutral-400 font-medium opacity-80 leading-relaxed">
              Al enviar, aceptas nuestros términos y condiciones.
            </p>
          </div>
        </div>

        {/* Lado Derecho - Ilustración y Texto */}
        <div className="hidden lg:flex flex-col items-center text-center space-y-8">
          <div className="relative w-64 h-64 animate-float">
            <Image 
              src="/Imagenes/calendario.png" 
              alt="Calendario ilustración" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="space-y-4 max-w-sm">
            <h3 className="text-3xl font-black text-neutral-800 tracking-tight">
              ¡Estás a un paso!
            </h3>
            <p className="text-neutral-500 font-medium text-[15px] leading-relaxed">
              Selecciona una fecha y hora para conocer tu próximo hogar. Nuestro equipo te confirmará la visita a la brevedad.
            </p>
          </div>
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


