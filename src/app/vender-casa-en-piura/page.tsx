'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  TrendingUp,
  Camera,
  Globe,
  CheckCircle2,
  ChevronDown,
  Star,
  Users,
  Trophy,
  MapPin,
  Clock,
  ArrowRight,
  TrendingDown,
  Coins,
  FileText,
  Search
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

export default function VenderPropiedadPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* 1. Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/Imagenes/Fondo-1.png')",
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
              Vende tu Propiedad Rápido y al <span className="text-[#0040FF]">Mejor Precio</span>
            </h1>
            <p className="text-base md:text-xl text-white/90 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
              Confía en los expertos de Piura. Maximizamos el valor de tu inmueble mediante tecnología Casaty Honecta® y marketing estratégico.
            </p>

            <div className="bg-white rounded-2xl p-2.5 max-w-xl mx-auto shadow-2xl flex flex-col md:flex-row items-center gap-4 border border-white/20">
              <div className="flex-1 text-left px-4">
                <p className="text-neutral-800 font-bold text-sm">
                  ¿Quieres saber cuánto vale tu casa hoy? 👉
                </p>
              </div>
              <Button size="lg" showArrow className="w-full md:w-auto">
                Vende tu Propiedad Ahora
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
              +32 operaciones completadas <br className="hidden lg:block" /> con éxito total
            </h3>
            <p className="text-neutral-500 font-bold text-sm mb-4">Clientes 100% satisfechos</p>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-neutral-800">4.8</span>
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 mb-4 flex items-center justify-center">
                <img src="/Imagenes/Imagen-1.webp" alt="Asesoría" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Acompañamiento</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Asesoría personalizada en todo el proceso de cierre y notaría.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 mb-4 flex items-center justify-center">
                <img src="/Imagenes/Imagen-2.webp" alt="Transparencia" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Transparencia</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Gestión en tiempo real de todos los detalles de tu venta.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 mb-4 flex items-center justify-center">
                <img src="/Imagenes/Imagen-3.webp" alt="Experto" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Expertos en Piura</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Conocimiento profundo del mercado inmobiliario local.
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
              Cómo te ayudamos a vender tu inmueble.
            </h2>
            <p className="text-neutral-500 mb-8 leading-relaxed font-normal text-lg">
              Nos encargamos de todo el proceso de venta, aplicando nuestra experiencia y recursos para garantizar el éxito de la operación. Desde la valoración experta hasta el marketing estratégico.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { icon: Coins, text: "Valoración Experta del Mercado", color: "bg-blue-50" },
                { icon: Globe, text: "Marketing Estratégico Digital", color: "bg-green-50" },
                { icon: Users, text: "Red de Compradores Calificados", color: "bg-purple-50" },
                { icon: FileText, text: "Gestión Completa de Trámites", color: "bg-orange-50" },
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
              Quiero saber todos los detalles
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-black group">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/RpS2H3ku7P4?autoplay=0&rel=0&modestbranding=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl border border-blue-50 hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#0040FF] flex items-center justify-center">
                  <TrendingUp className="text-white h-6 w-6" />
                </div>
                <div>
                  <p className="font-black text-neutral-800 text-lg">Máxima Rentabilidad</p>
                  <p className="text-neutral-500 font-bold text-sm">Venta al mejor precio</p>
                </div>
              </div>
              <div className="flex gap-10">
                <div>
                  <span className="block text-2xl font-black text-neutral-800">+16</span>
                  <span className="text-[10px] uppercase font-black text-neutral-500">Vendidos</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-neutral-800">+184</span>
                  <span className="text-[10px] uppercase font-black text-neutral-500">Visitas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic Grid */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-[1700px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-4">
            Estrategias que generan resultados
          </h2>
          <p className="text-neutral-500 font-medium mb-16 max-w-2xl mx-auto">
            Combinamos técnicas probadas y tecnología de punta para presentar tu propiedad de la mejor manera posible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fotografía y Video",
                desc: "Capturamos la esencia de tu propiedad con equipos profesionales para destacar en cada publicación.",
                img: "/Imagenes/Imagen-4.webp",
                icon: Camera
              },
              {
                title: "Exposición Masiva",
                desc: "Publicamos en los portales más importantes y en nuestra web de alto rendimiento.",
                img: "/Imagenes/Imagen-5.webp",
                icon: Globe
              },
              {
                title: "Redes Sociales",
                desc: "Campañas segmentadas para llegar directamente al público objetivo ideal de tu inmueble.",
                img: "/Imagenes/Imagen-6.webp",
                icon: Users
              }
            ].map((strategy, i) => (
              <div key={i} className="flex flex-col text-left group">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-md relative">
                  <img src={strategy.img} alt={strategy.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white font-bold text-sm">{strategy.title}</p>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-black text-neutral-800 mb-3">{strategy.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-bold">{strategy.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process Step by Step (Estilo Imagen 2 - Vertical) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1700px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-4">El Proceso de Venta Paso a Paso</h2>
          <p className="text-neutral-500 font-medium mb-16 max-w-2xl mx-auto">
            Te guiamos en cada etapa del proceso, garantizando transparencia y comunicación constante.
          </p>

          <div className="max-w-3xl mx-auto relative group">
            {/* Vertical Line Connector */}
            <div className="absolute left-[20px] top-4 bottom-12 w-[1.5px] bg-blue-100 z-0 group-hover:bg-blue-200 transition-colors" />

            <div className="space-y-12 text-left relative z-10">
              {[
                {
                  title: "Te asesoramos para poner el mejor precio",
                  desc: "Te aconsejamos un precio de publicación y recopilamos toda la documentación."
                },
                {
                  title: "Publicamos tu anuncio y filtramos a los interesados",
                  desc: "Hacemos fotografías profesionales y difundimos tu anuncio."
                },
                {
                  title: "Gestionamos tus visitas",
                  desc: "Nos encargamos de coordinar con los interesados para que no pierdas tiempo."
                },
                {
                  title: "Nos ocupamos de la verificación, trámites legales y documentación",
                  desc: "Una vez que aceptes la oferta de un comprador nos encargamos de todo el papeleo."
                },
                {
                  title: "Conseguimos financiación Premium para compradores",
                  desc: "Para que no tengas que esperar ofrecemos a los compradores el servicio de Casaty Hipotecas."
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
                  <h3 className="text-xl font-black text-green-600 leading-tight mb-2">¡Vendido!</h3>
                  <p className="text-sm text-neutral-500 font-bold mb-8">Ya puedes respirar, un dolor de cabeza menos 🙂</p>
                  <Button size="lg" showArrow>
                    Vende tu casa hoy mismo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Success Grid */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-8 w-full border-b border-slate-200 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[450px]">
              <img
                src="/Imagenes/agentes-vendiendo.webp"
                className="absolute inset-0 w-full h-full object-cover rounded-[3rem]"
                alt="Agentes vendiendo"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-2xl border border-blue-50">
                <p className="text-3xl font-black text-[#0040FF] leading-none mb-1">+240</p>
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none">Clientes felices</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-8 leading-tight">
                Ayudamos a más de 240 familias a cumplir sus objetivos inmobiliarios.
              </h2>
              <Button size="lg" showArrow>
                Quiero unirme a ellos
              </Button>
            </div>
          </div>
        </div>

        {/* Portales Logos */}
        <div className="max-w-[1700px] mx-auto px-4 lg:px-8 mt-20 text-center">
          <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-10">Publicamos en los mejores portales</p>
          <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <span className="text-2xl font-black text-neutral-800">Urbania</span>
            <span className="text-2xl font-black text-neutral-800">Adondevivir</span>
            <img src="/Imagenes/logo-laencontre.webp" alt="LaEncontre" className="h-14 w-auto" />
            <img src="/Imagenes/logo-properati.webp" alt="Properati" className="h-14 w-auto" />
            <span className="text-2xl font-black text-neutral-800 opacity-20 hidden md:block">///</span>
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-16">Preguntas frecuentes para vender tu vivienda</h2>

          <div className="space-y-4 text-left">
            {[
              {
                q: "¿Cuánto cuesta poner mi propiedad a la venta con Casaty?",
                a: "No tienes que pagar nada por adelantado. La inversión en marketing y gestión corre por nuestra cuenta hasta que se concrete la venta."
              },
              {
                q: "¿Cuál es la comisión por venta?",
                a: "Nuestra comisión estándar varía entre el 3% y el 5% del valor final de venta, dependiendo de la exclusividad y complejidad del inmueble."
              },
              {
                q: "¿Realizan una valuación de mi inmueble?",
                a: "Sí, realizamos un Análisis Comparativo de Mercado (ACM) basado en datos reales de cierre en Piura para asegurar un precio competitivo."
              },
              {
                q: "¿Se encargan de toda la documentación?",
                a: "Así es. Te asesoramos y gestionamos los pagos de impuestos (Renta, Alcabala) y el levantamiento de cualquier carga registral para una venta limpia."
              }
            ].map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Center */}
      <section className="py-24 bg-[#eff6ff]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-800 mb-8 leading-tight">
            Vende tu propiedad sin estrés.
          </h2>
          <p className="text-neutral-500 font-bold mb-12 text-lg">
            Estamos listos para encontrar al comprador ideal para tu inmueble en el menor tiempo posible.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button size="lg" showArrow className="w-full md:w-auto px-12 h-16 text-lg">
              Empezar ahora gratis
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto px-12 h-16 text-lg bg-white">
              Hablar con un experto
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
