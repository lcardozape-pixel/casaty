'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  ChevronDown,
  Scale,
  ShieldAlert,
  Gavel,
  History,
  Lock,
  UserCheck,
  AlertTriangle,
  FileCheck,
  Search,
  PenTool,
  MessageSquare,
  Clock
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
        <ChevronDown className={`h-5 w-5 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0127AC]' : ''}`} />
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

export default function ContratoAlquilerPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[600px] md:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/Imagenes/contratos-hero.png')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Tu Inversión Protegida con <br /> Criterio Legal
            </h1>
            <p className="text-sm md:text-xl text-white/90 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
              No arriesgues tu propiedad con formatos genéricos. Redactamos contratos de alquiler blindados con las últimas cláusulas de desalojo express.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" showArrow>
                Blindar mi contrato hoy
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-neutral-800 border-none">
                Ver Riesgos Comunes
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 md:-mt-16 relative z-30 w-full mb-12">
        <div className="bg-[#eff6ff] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12 border border-blue-100">
          <div className="flex flex-col items-center lg:items-start border-b lg:border-b-0 lg:border-r border-blue-200/50 pb-8 lg:pb-0 lg:pr-16 last:border-0 w-full lg:w-auto">
            <h3 className="text-neutral-800 font-black text-2xl mb-1 leading-tight text-center lg:text-left">
              +850 Propietarios <br className="hidden lg:block" /> Protegidos en Piura
            </h3>
            <p className="text-neutral-500 font-bold text-sm mb-4">Garantía total de seguridad legal</p>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                <ShieldCheck className="text-white h-7 w-7" />
              </div>
              <div>
                <p className="font-black text-neutral-800 text-lg">Cero Desalojos Fallidos</p>
                <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest">Efectividad del 100%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                <Gavel className="h-8 w-8 text-[#0127AC]" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Desalojo Express</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Cláusulas de allanamiento futuro y desalojo con intervención notarial.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                <FileCheck className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Inventario Detallado</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Protegemos el estado de tus muebles y acabados con respaldo fotográfico.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                <Lock className="h-8 w-8 text-orange-500" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Garantía Segura</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Mecanismos claros de retención de garantía ante daños o morosidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Safety vs Risk */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-neutral-800 mb-6 leading-tight">
              ¿Por qué un contrato genérico es un peligro?
            </h2>
            <p className="text-neutral-500 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-lg">
              Los contratos estándar no consideran las nuevas leyes de protección al propietario en Perú. Un "mal contrato" puede significar años de juicios y miles de soles perdidos.
            </p>

            <div className="space-y-4">
              {[
                "Allanamiento Futuro (Ley 30201)",
                "Cláusula de Desalojo Notarial",
                "Inventario con validez técnica",
                "Penalidades por morosidad extrema",
                "Mecanismos de resolución sin ir a juicio"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center">
                   <CheckCircle2 className="h-5 w-5 text-[#0127AC]" />
                  </div>
                  <span className="font-bold text-neutral-800 text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-100/50 rounded-[3rem] blur-2xl group-hover:bg-blue-200/50 transition-all duration-500" />
            <div className="relative bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 group-hover:bg-red-100 transition-colors" />
               <div className="flex gap-4 mb-8">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black text-neutral-800 leading-tight">Mitos y Riesgos</h3>
              </div>
              
              <ul className="space-y-8">
                {[
                  { title: "Juicio de Desalojo Ordinario", desc: "Sin blindaje, un desalojo en Perú puede tardar de 2 a 4 años en el poder judicial." },
                  { title: "Daños Ocultos", desc: "Si el inquilino destruye la propiedad y no hay inventario técnico, no podrás cobrar los daños." },
                  { title: "Derecho de Poseedor", desc: "Formatos mal redactados pueden dar derechos de permanencia inesperados al inquilino." },
                ].map((risk, i) => (
                  <li key={i} className="group/item">
                    <h4 className="font-black text-red-600 text-[10px] uppercase tracking-[0.2em] mb-2">Riesgo #0{i+1}</h4>
                    <h4 className="font-black text-neutral-800 text-lg mb-2">{risk.title}</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed font-bold">{risk.desc}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-10 border-t border-slate-100">
                <img 
                  src="/Imagenes/legal-seguridad.png" 
                  alt="Seguridad Legal" 
                  className="rounded-3xl shadow-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Step by Step */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-4">¿Cómo blindamos tu contrato?</h2>
          <p className="text-neutral-500 font-medium mb-16 max-w-2xl mx-auto">
            Un servicio integral de redacción y validación legal en tiempo récord.
          </p>

          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute left-[20px] top-4 bottom-12 w-[1.5px] bg-blue-100 z-0 group-hover:bg-blue-200 transition-colors" />

            <div className="space-y-12 text-left relative z-10">
              {[
                {
                  title: "Consulta Inicial y Filtro de Inquilino",
                  desc: "Definimos las condiciones del alquiler y validamos legalmente al potencial arrendatario.",
                  icon: MessageSquare
                },
                {
                  title: "Redacción Personalizada",
                  desc: "Elaboramos el borrador incluyendo todas las cláusulas de protección para el propietario.",
                  icon: PenTool
                },
                {
                  title: "Revisión y Ajustes",
                  desc: "Compartimos el borrador con ambas partes y ajustamos detalles comerciales/legales.",
                  icon: Search
                },
                {
                  title: "Firma con Intervención Notarial",
                  desc: "Validamos las firmas ante notario público para activar los mecanismos de desalojo express.",
                  icon: Lock
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-start group/item">
                  <div className="h-10 w-10 shrink-0 bg-blue-50 text-[#0127AC] flex items-center justify-center rounded-full font-black shadow-sm border border-blue-100 group-hover/item:scale-110 transition-transform">
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
                  <h3 className="text-xl font-black text-green-600 leading-tight mb-2">¡Inversión Segura!</h3>
                  <p className="text-sm text-neutral-500 font-bold mb-8">Disfruta de la renta mensual con total tranquilidad legal 🙂</p>
                  <Button size="lg" showArrow>
                    Cotizar redacción de contrato
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits Grid */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-neutral-800 mb-16">
            Servicio Legal Inmobiliario Premium
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Desalojo con Intervención Notarial",
                desc: "Implementamos la cláusula que te permite recuperar tu propiedad en semanas, no años.",
                icon: Gavel
              },
              {
                title: "Respaldo Fotográfico",
                desc: "Incluimos un anexo digital con el estado exacto del inmueble al momento de la entrega.",
                icon: FileCheck
              },
              {
                title: "Filtro Sentinel/Infocorp",
                desc: "Validamos el historial crediticio de tu inquilino antes de firmar cualquier documento.",
                icon: UserCheck
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 text-left hover:shadow-xl transition-all group">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-[#0127AC] transition-colors">
                  <benefit.icon className="h-7 w-7 text-[#0127AC] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-neutral-800 mb-4">{benefit.title}</h3>
                <p className="text-sm text-neutral-500 font-bold leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQs */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-16">Preguntas frecuentes sobre Contratos</h2>

          <div className="space-y-4 text-left">
            {[
              {
                q: "¿Qué es el allanamiento futuro?",
                a: "Es una cláusula donde el inquilino acepta devolver la propiedad inmediatamente si el contrato vence o si deja de pagar la renta por dos meses y medio."
              },
              {
                q: "¿Por qué es mejor un contrato con firma notarial?",
                a: "Porque da fe pública de la fecha y del acuerdo, y permite ejecutar el desalojo notarial, que es el mecanismo más rápido en la legislación peruana actual."
              },
              {
                q: "¿Qué pasa si el inquilino no quiere irse?",
                a: "Con un contrato blindado por Casaty, inicias un proceso ejecutivo corto donde el juez ordena el lanzamiento sin necesidad de un juicio largo de años."
              },
              {
                q: "¿Incluyen inventario en la redacción?",
                a: "Sí, todos nuestros contratos incluyen un modelo detallado de inventario y el estado de conservación para proteger tu garantía."
              }
            ].map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

      {/* 7. Final CTA with Premium Gradient */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0127AC] to-[#001D8A] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full -ml-32 -mb-32 blur-2xl" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            No dejes tu propiedad <br /> a la suerte.
          </h2>
          <p className="text-blue-100 font-bold mb-12 text-lg">
            Blindar tu contrato es la mejor inversión que puedes hacer como propietario. Habla hoy con nuestro equipo legal.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button size="lg" className="w-full md:w-auto px-12 bg-white text-[#0127AC] hover:bg-slate-100" showArrow>
              Blindar mi contrato ahora
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto px-12 border-white text-white hover:bg-white/10">
              WhatsApp Legal
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


