'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Zap,
  Star,
  Users,
  Trophy,
  Scale,
  MapPin,
  Search,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  ClipboardCheck,
  Building2,
  FileSearch,
  Calculator,
  FileText
} from "lucide-react";
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

export function TasacionesContent() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[600px] md:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/Imagenes/tasaciones-hero.png')",
            filter: "brightness(0.35)"
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Conoce el <span className="text-[#0040FF]">Valor Real</span> de tu <br /> Propiedad en Piura
            </h1>
            <p className="text-sm md:text-xl text-white/90 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
              Tasaciones inmobiliarias con rigor técnico y validez legal. Obtén un informe detallado en tiempo récord para vender, hipotecar o procesos legales.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" showArrow>
                Solicitar Tasación Ahora
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-neutral-800 border-none">
                Ver Modelo de Informe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 md:-mt-16 relative z-30 w-full mb-12">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12 border border-slate-100">
          <div className="flex flex-col items-center lg:items-start border-b lg:border-b-0 lg:border-r border-slate-100 pb-8 lg:pb-0 lg:pr-16 last:border-0 w-full lg:w-auto">
            <h3 className="text-neutral-800 font-black text-2xl mb-1 leading-tight text-center lg:text-left">
              +1,200 Tasaciones <br className="hidden lg:block" /> Realizadas con Éxito
            </h3>
            <p className="text-neutral-500 font-bold text-sm mb-4">Informes con precisión milimétrica</p>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                <ShieldCheck className="text-[#0040FF] h-7 w-7" />
              </div>
              <div>
                <p className="font-black text-neutral-800 text-lg">Tasadores Colegiados</p>
                <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest">Garantía Profesional</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-slate-50 rounded-2xl">
                <Zap className="h-8 w-8 text-orange-500" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Resultados en 48h</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Entrega express de informes preliminares para decisiones rápidas.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-slate-50 rounded-2xl">
                <Scale className="h-8 w-8 text-[#0040FF]" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Validez Jurídica</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Sustento técnico aceptado por entidades bancarias y judiciales.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-slate-50 rounded-2xl">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Expertos Locales</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Conocimiento profundo de las micro-zonas y plusvalía en Piura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Valuation Matters */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-4xl font-black text-neutral-800 mb-6 leading-tight">
              ¿Vendes o compras? <br /> No pierdas dinero.
            </h2>
            <p className="text-neutral-500 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-lg">
              Establecer el precio incorrecto es el error #1 en el sector inmobiliario. Una tasación profesional te permite negociar con autoridad y seguridad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Valuación Comercial", desc: "Precio de cierre real del mercado.", icon: DollarSign },
                { title: "Detalle Técnico", desc: "Análisis de materiales y conservación.", icon: ClipboardCheck },
                { title: "Entorno Urbano", desc: "Plusvalía proyectada por zona.", icon: Building2 },
                { title: "Cargas y Gravámenes", desc: "Revisión de estado legal.", icon: FileSearch },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start gap-4">
                  <div className="h-12 w-12 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-[#0040FF]" />
                  </div>
                  <div>
                    <h4 className="font-black text-neutral-800 text-lg leading-tight mb-1">{item.title}</h4>
                    <p className="text-xs text-neutral-500 font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-[3rem] blur-2xl group-hover:bg-blue-200/50 transition-all duration-500" />
              <img 
                src="/Imagenes/tasacion-analisis.png" 
                alt="Tasador Profesional" 
                className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/3] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#0040FF] flex items-center justify-center text-white">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-neutral-800">Informe bajo Nomas Nacionales</p>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest leading-none">Reglamento Nacional de Tasaciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Types of Services */}
      <section className="py-16 md:py-24 bg-neutral-900 text-white rounded-[3rem] md:rounded-[4rem] mx-4 lg:mx-8 mb-20 md:mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0040FF]/20 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="relative z-10 max-w-7xl mx-auto px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Servicios Especializados</h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto italic underline decoration-[#0040FF] decoration-2 underline-offset-8">Soluciones técnicas para cada necesidad.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Tasación Bancaria",
                desc: "Informes aceptados por las principales entidades financieras para créditos hipotecarios y garantías.",
                points: ["Formato SBS", "Sustento técnico rígido", "Fotos de alta resolución"]
              },
              {
                title: "Valuación Legal",
                desc: "Para procesos de herencia, sucesiones intestadas, divorcios y repartición de bienes con validez pericial.",
                points: ["Peritaje imparcial", "Validez en registros", "Informe comparativo"]
              },
              {
                title: "Comercial / Venta",
                desc: "Establece el precio óptimo para vender tu propiedad en el menor tiempo posible sin regalar tu patrimonio.",
                points: ["Análisis de demanda", "Precio de cierre sugerido", "Estrategia de mercado"]
              }
            ].map((service, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="h-2 w-8 bg-[#0040FF] rounded-full" /> {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium italic">"{service.desc}"</p>
                <ul className="space-y-4">
                  {service.points.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs font-black uppercase tracking-wider text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-[#0040FF]" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process Step by Step */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-4">¿Cómo trabajamos tu informe?</h2>
          <p className="text-neutral-500 font-medium mb-16 max-w-2xl mx-auto">
            Un proceso riguroso para asegurar la máxima precisión en el valor final.
          </p>

          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute left-[20px] top-4 bottom-12 w-[1.5px] bg-blue-100 z-0 group-hover:bg-blue-200 transition-colors" />

            <div className="space-y-12 text-left relative z-10">
              {[
                {
                  title: "Solicitud y Cotización",
                  desc: "Nos envías los datos básicos y la partida registral para definir el alcance del informe.",
                  icon: FileText
                },
                {
                  title: "Inspección Técnica In-Situ",
                  desc: "Un perito visita la propiedad para evaluar estado, acabados, entorno y medidas reales.",
                  icon: Search
                },
                {
                  title: "Análisis y Elaboración",
                  desc: "Cruzamos datos con el mercado local y aplicamos métodos de costo, mercado y renta.",
                  icon: Calculator
                },
                {
                  title: "Entrega del Informe Final",
                  desc: "Recibes el documento digital (PDF) y físico firmado por un tasador colegiado.",
                  icon: ClipboardCheck
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
                  <h3 className="text-xl font-black text-green-600 leading-tight mb-2">¡Todo Listo!</h3>
                  <p className="text-sm text-neutral-500 font-bold mb-8">Ya tienes el respaldo técnico que necesitas 🤝</p>
                  <Button size="lg" showArrow>
                    Agendar inspección ahora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQs */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-16">Preguntas sobre Tasaciones</h2>

          <div className="space-y-4 text-left">
            {[
              {
                q: "¿Cuánto tiempo demora el proceso?",
                a: "Generalmente, desde la inspección física, el informe preliminar se entrega en 48h y el informe final detallado en un plazo de 4 a 5 días hábiles."
              },
              {
                q: "¿Qué documentos debo presentar?",
                a: "Necesitamos la copia literal de la partida registral (actualizada), el PU (Predio Urbano) y el HR (Hoja de Resumen) emitidos por la municipalidad."
              },
              {
                q: "¿La tasación tiene fecha de vencimiento?",
                a: "Sí, técnicamente la vigencia es de 6 meses a 1 año debido a la volatilidad del mercado inmobiliario y los cambios en el entorno urbano."
              },
              {
                q: "¿Qué factores influyen más en el precio?",
                a: "La ubicación es el factor #1. Luego evaluamos el frente del lote, el estado de conservación de la construcción, la zonificación y los servicios disponibles."
              }
            ].map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-16 md:py-24 bg-[#0040FF]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Valora tu patrimonio con <br /> rigor técnico.
          </h2>
          <p className="text-blue-100 font-bold mb-12 text-lg">
            No adivines el precio. Solicita hoy una tasación profesional y negocia con seguridad.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button size="lg" className="w-full md:w-auto px-12 bg-white text-[#0040FF] hover:bg-slate-100" showArrow>
              Cotizar mi tasación
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto px-12 border-white text-white hover:bg-white/10">
              Ver servicios corporativos
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
