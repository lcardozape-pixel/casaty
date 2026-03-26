'use client';

import React from 'react';
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Users,
  Target,
  CheckCircle2,
  Trophy,
  Star,
  Globe,
  Heart,
  Briefcase,
  History,
  TrendingUp,
  MapPin,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* 1. Introductory Header (Sin Hero Image como pidió el usuario) */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 max-w-[1700px] mx-auto px-4 lg:px-8 w-full border-b border-slate-100 bg-white rounded-b-[3rem] md:rounded-b-[4rem] shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.3em] mb-4 block">Sobre Nosotros</span>
            <h1 className="text-3xl md:text-7xl font-black text-neutral-800 mb-6 md:mb-8 leading-[1.1] tracking-tighter">
              Transformando el Sector <br className="hidden md:block" /> Inmobiliario en <span className="text-[#0040FF]">Piura</span>.
            </h1>
            <p className="text-base md:text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Somos más que una agencia de bienes raíces; somos arquitectos de sueños y facilitadores de inversiones seguras con alma norteña.
            </p>
          </motion.div>
        </div>

        {/* Floating Trust Bar inside header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-20 pt-10 md:pt-16 border-t border-slate-50">
          {[
            { label: "Casas Vendidas", value: "350+", icon: Trophy },
            { label: "Clientes Felices", value: "1,200", icon: Heart },
            { label: "Años de Trayectoria", value: "10+", icon: History },
            { label: "Agentes Expertos", value: "15", icon: Users },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#0040FF] group-hover:scale-110 transition-all">
                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-[#0040FF] group-hover:text-white" />
              </div>
              <span className="text-2xl md:text-3xl font-black text-neutral-800 mb-1">{stat.value}</span>
              <span className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. The Story Section */}
      <section className="py-16 md:py-24 max-w-[1700px] mx-auto px-4 lg:px-8 w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-100/50 rounded-full blur-[80px] md:blur-[100px] -mr-16 md:-mr-32 -mt-16 md:-mt-32 -z-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="h-14 w-14 bg-[#0040FF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
               <History className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-800 leading-tight">
              Una visión que nació en el <span className="text-[#0040FF]">corazón de Piura</span>.
            </h2>
            <div className="space-y-6 text-neutral-500 font-medium text-lg leading-relaxed">
              <p>
                Casaty nació bajo el concepto de <span className="text-neutral-800 font-black">transparencia total</span>. Vimos como el mercado inmobiliario crecía de forma desordenada en nuestra región y decidimos marcar una diferencia.
              </p>
              <p>
                Hoy, nos hemos consolidado como el aliado estratégico ideal para quienes necesitan vender rápido, alquilar seguro o tasar con rigor técnico. Nuestra red de aliados, protegida por el sello <span className="text-[#0040FF] font-black">HONECTA®</span>, garantiza que cada transacción sea una experiencia placentera.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="font-black text-neutral-800 text-sm">Cede Central: Piura</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <Briefcase className="h-5 w-5 text-[#0040FF]" />
                <span className="font-black text-neutral-800 text-sm">Respaldo Honecta®</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-12 grid-rows-12 gap-4 h-[600px]"
          >
            <div className="col-span-8 row-span-12 relative group">
              <img 
                src="/Imagenes/oficina-casaty.png" 
                alt="Oficina Casaty" 
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl grayscale-[0.2] transition-all duration-500 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem]" />
            </div>
            <div className="col-span-4 row-span-7 relative group">
              <img 
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Propiedad Casaty" 
                className="w-full h-full object-cover rounded-[2rem] shadow-xl grayscale-[0.2] group-hover:grayscale-0 transition-opacity"
              />
            </div>
            <div className="col-span-4 row-span-5 bg-[#0040FF] rounded-[2rem] p-6 text-white flex flex-col justify-center items-center text-center shadow-xl">
               <span className="text-4xl font-black mb-2">98%</span>
               <span className="text-[8px] font-black uppercase tracking-widest opacity-80">Satisfacción <br /> del Cliente</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Purpose & Values */}
      <section className="py-24 bg-neutral-900 rounded-[4rem] mx-4 lg:mx-8 mb-24 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0040FF]/20 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="relative z-10 max-w-[1700px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.3em] mb-4 block">Nuestro ADN</span>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Principios <br /> que nos <span className="text-[#0040FF]">mueven</span>.</h2>
              <p className="text-slate-400 font-medium leading-relaxed italic border-l-4 border-[#0040FF] pl-6 py-2 mb-12">
                "No solo vendemos casas, ayudamos a familias piuranas a sembrar las bases de su futuro con seguridad legal y comercial."
              </p>
              <Button size="lg" className="w-full md:w-auto bg-white text-neutral-900 hover:bg-slate-100" showArrow>
                Ver Servicios
              </Button>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: "Confianza Extrema", 
                  desc: "La transparencia es nuestro estandarte. Documentamos cada paso para tu absoluta tranquilidad.",
                  icon: ShieldCheck
                },
                { 
                  title: "Innovación Tecnológica", 
                  desc: "Usamos las mejores herramientas digitales para posicionar tu propiedad ante los compradores ideales.",
                  icon: TrendingUp
                },
                { 
                  title: "Enfoque en el Cliente", 
                  desc: "Cada caso es único. Adaptamos nuestra estrategia comercial a tus tiempos y expectativas específicas.",
                  icon: Users
                },
                { 
                  title: "Impacto en Piura", 
                  desc: "Estamos comprometidos con el desarrollo urbano ordenado y sostenible de nuestra ciudad.",
                  icon: Target
                }
              ].map((val, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                   <div className="h-12 w-12 rounded-2xl bg-[#0040FF]/20 flex items-center justify-center mb-6 group-hover:bg-[#0040FF] transition-all">
                      <val.icon className="h-6 w-6 text-[#0040FF] group-hover:text-white" />
                   </div>
                   <h3 className="text-xl font-black mb-4 group-hover:text-[#0040FF] transition-colors">{val.title}</h3>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team Focus Section */}
      <section className="py-24 max-w-[1700px] mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative"
           >
              <div className="absolute -inset-4 bg-orange-100/30 rounded-[3rem] blur-2xl -z-10" />
              <img 
                src="/Imagenes/equipo-casaty.png" 
                alt="Equipo Casaty" 
                className="w-full h-[600px] object-cover rounded-[4rem] shadow-2xl grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-10 right-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 text-center animate-bounce-slow">
                 <div className="flex gap-1 mb-2">
                   {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                 </div>
                 <p className="text-[10px] font-black text-neutral-800 uppercase tracking-widest">Servicio 5 Estrellas</p>
              </div>
           </motion.div>

           <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-black text-neutral-800 leading-tight">Un equipo que respira <br /> <span className="text-[#0040FF]">pasión inmobiliaria</span>.</h2>
              <p className="text-neutral-500 font-medium text-lg leading-relaxed">
                Nuestros agentes no solo venden metros cuadrados, venden hogares. Contamos con un equipo multidisciplinario de expertos en ventas, derecho inmobiliario y marketing digital.
              </p>

              <div className="space-y-6">
                 {[
                   "Capacitación constante en normativas actuales.",
                   "Dominio de las herramientas digitales más potentes.",
                   "Atención personalizada de inicio a fin.",
                   "Pasión por los detalles que hacen la diferencia."
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-neutral-800">{item}</span>
                   </div>
                 ))}
              </div>

              <div className="pt-6">
                <Button size="lg" variant="outline" className="h-16 px-12 text-lg hover:bg-neutral-800 hover:text-white transition-all" showArrow>
                  Trabaja con nosotros
                </Button>
              </div>
           </div>
        </div>
      </section>

      {/* 5. Final Vision Statement */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <Globe className="h-16 w-16 text-[#0040FF]/20 mx-auto mb-10" />
           <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-8 leading-tight">Mirando hacia el futuro.</h2>
           <p className="text-neutral-500 font-medium text-lg leading-relaxed mb-12">
             Nuestra meta es digitalizar por completo la experiencia inmobiliaria en el norte del país, eliminando la burocracia y el miedo, convirtiendo cada compra-venta en un motivo de celebración.
           </p>
           <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <History className="h-5 w-5 text-neutral-400" />
                 </div>
                 <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Desde 2014 en Piura</span>
              </div>
              <div className="h-px w-12 bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <TrendingUp className="h-5 w-5 text-neutral-400" />
                 </div>
                 <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">En expansión nacional</span>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0040FF]">
        <div className="max-w-[1700px] mx-auto px-4 text-center text-white">
           <h2 className="text-4xl md:text-6xl font-black mb-12">¿Empezamos tu historia hoy?</h2>
           <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-[#0040FF] hover:bg-slate-100 h-16 px-12 text-lg" showArrow>
                Ver Propiedades
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-16 px-12 text-lg">
                Hablar con un Experto
              </Button>
           </div>
        </div>
      </section>
    </main>
  );
}
