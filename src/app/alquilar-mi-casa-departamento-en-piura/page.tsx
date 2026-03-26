'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  UserCheck,
  Wallet,
  CalendarSearch,
  CheckCircle2,
  ChevronDown,
  Star,
  Clock,
  MapPin,
  Trophy,
  Users,
  Building2,
  FileText,
  Camera,
  Globe
} from "lucide-react";
import Link from 'next/link';
import { motion } from "framer-motion";

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className={`border border-slate-100 rounded-2xl p-6 transition-all duration-300 cursor-pointer bg-slate-50/50 ${isOpen ? 'border-blue-200 bg-blue-50/30' : 'hover:border-blue-100'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-neutral-800">{question}</span>
        <ChevronDown className={`h-5 w-5 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0040FF]' : ''}`} />
      </div>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-neutral-500 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function AlquilarPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* 1. Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            filter: "brightness(0.5)"
          }}
        />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Alquila tu Propiedad con <span className="text-[#0040FF]">Cero Riesgos</span>
            </h1>
            <p className="text-base md:text-xl text-white/90 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
              Filtramos al inquilino ideal y blindamos tu contrato. Maximiza tu rentabilidad sin complicaciones legales ni moras.
            </p>

            <div className="bg-white rounded-2xl p-2.5 max-w-xl mx-auto shadow-2xl flex flex-col md:flex-row items-center gap-4 border border-white/20">
              <div className="flex-1 text-left px-4">
                <p className="text-neutral-800 font-bold text-sm">
                  ¿Buscas un inquilino puntual y confiable? 👉
                </p>
              </div>
              <Button size="lg" showArrow className="w-full md:w-auto">
                Alquila mi Inmueble Ahora
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Stats Bar */}
      <section className="max-w-[1700px] mx-auto px-4 lg:px-8 -mt-16 relative z-30 w-full mb-12">
        <div className="bg-[#eff6ff] rounded-[2.5rem] shadow-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12 border border-blue-100">
          <div className="flex flex-col items-center lg:items-start border-b lg:border-b-0 lg:border-r border-blue-200/50 pb-8 lg:pb-0 lg:pr-16 last:border-0 w-full lg:w-auto">
            <h3 className="text-neutral-800 font-black text-2xl mb-1 leading-tight text-center lg:text-left">
              +120 contratos gestionados <br className="hidden lg:block" /> con éxito total
            </h3>
            <p className="text-neutral-500 font-bold text-sm mb-4">Inquilinos 100% filtrados</p>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-neutral-800">4.9</span>
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-1">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 mb-4 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-[#0040FF]" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Seguridad Jurídica</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Contratos con cláusula de allanamiento futuro para tu protección total.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 mb-4 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-[#0040FF]" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Filtro Riguroso</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Evaluamos historial crediticio, laboral y antecedentes de cada postulante.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 mb-4 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Wallet className="h-8 w-8 text-[#0040FF]" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Pago Puntual</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Garantizamos que el inquilino tenga la solvencia necesaria para el alquiler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. High Performance Sections */}
      <section className="py-24 max-w-[1700px] mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-6 leading-tight">
              Gestionamos tu alquiler de principio a fin.
            </h2>
            <p className="text-neutral-500 mb-8 leading-relaxed font-normal text-lg">
              No solo buscamos una persona, buscamos al inquilino correcto. Nuestro proceso garantiza que tu inversión esté en buenas manos, permitiéndote disfrutar de tu renta sin dolores de cabeza.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { icon: Camera, text: "Fotos y Video de Alta Calidad", color: "bg-blue-50" },
                { icon: Globe, text: "Publicidad en Portales Premium", color: "bg-green-50" },
                { icon: FileText, text: "Contratos Blindados Casaty", color: "bg-purple-50" },
                { icon: Users, text: "Verificación de Antecedentes", color: "bg-orange-50" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl ${item.color} flex items-center justify-center shadow-sm`}>
                    <item.icon className="h-5 w-5 text-neutral-700" />
                  </div>
                  <span className="font-bold text-neutral-700 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <Button size="lg" showArrow>
              Me interesa saber más
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                className="w-full h-full object-cover" 
                alt="Living room premium"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-blue-50 hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 className="text-white h-6 w-6" />
                </div>
                <div>
                  <p className="font-black text-neutral-800 text-lg">Alquiler Seguro</p>
                  <p className="text-neutral-500 font-bold text-sm">Protección 360°</p>
                </div>
              </div>
              <p className="text-sm text-neutral-500 font-medium max-w-[200px]">
                Nuestros contratos incluyen todas las protecciones legales vigentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic Grid */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-[1700px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-4">
            Ventajas de Alquilar con Casaty
          </h2>
          <p className="text-neutral-500 font-medium mb-16 max-w-2xl mx-auto">
            Hacemos que el proceso sea simple para ti y atractivo para los mejores inquilinos del mercado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Inquilinos de Calidad",
                desc: "Solo presentamos candidatos con perfiles solventes y comportamiento crediticio impecable.",
                icon: UserCheck
              },
              {
                title: "Visibilidad Máxima",
                desc: "Tu inmueble aparecerá en las primeras posiciones de Urbania, Adondevivir y nuestra red exclusiva.",
                icon: Building2
              },
              {
                title: "Asesoría Legal",
                desc: "Un equipo especializado redacta y revisa cada cláusula para evitar problemas futuros.",
                icon: ShieldCheck
              }
            ].map((card, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-left hover:bg-white hover:shadow-2xl transition-all group">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-[#0040FF] transition-colors">
                  <card.icon className="h-8 w-8 text-[#0040FF] group-hover:text-white" />
                </div>
                <h3 className="text-xl font-black text-neutral-800 mb-4">{card.title}</h3>
                <p className="text-neutral-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process Step by Step (Estilo Imagen 2 - Vertical) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1700px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-4">Tu alquiler en pasos sencillos</h2>
          <p className="text-neutral-500 font-medium mb-16 max-w-2xl mx-auto">
            Te guiamos en cada etapa del proceso, garantizando transparencia y comunicación constante.
          </p>

          <div className="max-w-3xl mx-auto relative group">
            {/* Vertical Line Connector */}
            <div className="absolute left-[20px] top-4 bottom-12 w-[1.5px] bg-blue-100 z-0 group-hover:bg-blue-200 transition-colors" />

            <div className="space-y-12 text-left relative z-10">
              {[
                {
                  title: "Valoración y sesión de fotos",
                  desc: "Determinamos el precio ideal y realizamos una sesión profesional para resaltar tu inmueble."
                },
                {
                  title: "Publicación estratégica",
                  desc: "Difundimos tu propiedad en los mejores portales inmobiliarios y redes sociales."
                },
                {
                  title: "Filtro y visitas guiadas",
                  desc: "Nos encargamos de calificar a los interesados y coordinar las visitas a tu propiedad."
                },
                {
                  title: "Evaluación crediticia y legal",
                  desc: "Realizamos un filtro riguroso de antecedentes para asegurar inquilinos responsables."
                },
                {
                  title: "Firma de contrato y entrega de llaves",
                  desc: "Formalizamos el acuerdo con seguridad jurídica y entregamos tu inmueble."
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-start group/item">
                  <div className="h-10 w-10 shrink-0 bg-blue-50 text-[#0040FF] flex items-center justify-center rounded-full font-black shadow-sm border border-blue-100 group-hover/item:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-black text-neutral-800 leading-tight mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-500 font-bold leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-8 items-start">
                <div className="h-10 w-10 shrink-0 bg-green-500 text-white flex items-center justify-center rounded-full font-black shadow-md border border-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-black text-green-600 leading-tight mb-2">¡Inquilino Ideal!</h3>
                  <p className="text-sm text-neutral-500 font-bold mb-8">Disfruta de la tranquilidad de un alquiler seguro 🙂</p>
                  <Button size="lg" showArrow>
                    Alquila tu propiedad ahora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQs Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-16">Preguntas frecuentes sobre alquileres</h2>

          <div className="space-y-4 text-left">
            {[
              {
                q: "¿Cómo filtran a los posibles inquilinos?",
                a: "Realizamos una verificación exhaustiva que incluye historial preventivo en centrales de riesgo (Infocorp), verificación de boletas de pago, estabilidad laboral y contactamos a sus antiguos arrendadores."
              },
              {
                q: "¿Qué es el contrato con cláusula de allanamiento futuro?",
                a: "Es una herramienta legal que te protege como propietario. Permite agilizar el proceso de desalojo y recuperación de tu inmueble en caso de falta de pago o vencimiento de contrato."
              },
              {
                q: "¿Casaty cobra el primer mes de alquiler?",
                a: "Generalmente, nuestra comisión por gestión de alquiler equivale a un mes de renta, pero esto se amortiza rápidamente con la seguridad de tener un inquilino calificado que paga puntualmente."
              },
              {
                q: "¿Cuánto tiempo tarda el proceso de alquiler?",
                a: "Si el inmueble está a precio de mercado y en buenas condiciones, el periodo promedio de cierre en Piura es de entre 15 a 30 días."
              }
            ].map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 bg-[#eff6ff]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-800 mb-8 leading-tight">
            ¿Listo para poner tu inmueble en renta?
          </h2>
          <p className="text-neutral-500 font-bold mb-12 text-lg">
            Únete a las decenas de propietarios que hoy duermen tranquilos gracias a Casaty.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button size="lg" showArrow className="w-full md:w-auto px-12 h-16 text-lg">
              Alquilar mi Propiedad Ahora
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto px-12 h-16 text-lg bg-white">
              Hablar con un asesor
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

