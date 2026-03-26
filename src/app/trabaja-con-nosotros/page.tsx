'use client';

import React from 'react';
import { Button } from "@/components/ui/Button";
import {
  Briefcase,
  GraduationCap,
  Coins,
  Heart,
  CheckCircle2,
  TrendingUp,
  Star,
  Users,
  Trophy,
  Zap,
  Globe,
  Clock,
  ArrowRight,
  ShieldCheck,
  Target
} from "lucide-react";
import { motion } from "framer-motion";

export default function TrabajaNosotrosPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 overflow-x-hidden">
      {/* 1. Header (Sin Hero Image como pidió el usuario) */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 max-w-[1700px] mx-auto px-4 lg:px-8 w-full bg-white border-b border-slate-100 rounded-b-[3rem] md:rounded-b-[4rem] shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.3em] mb-4 block">Carreras en Casaty</span>
            <h1 className="text-3xl md:text-7xl font-black text-neutral-800 mb-6 md:mb-8 leading-[1.1] tracking-tighter">
              Lleva tu Carrera al <br className="hidden md:block" /> <span className="text-[#0040FF]">Siguiente Nivel</span>.
            </h1>
            <p className="text-base md:text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
              No buscamos simples empleados, buscamos socios estratégicos apasionados por transformar el mercado inmobiliario de Piura.
            </p>
          </motion.div>
        </div>

        {/* Floating Perks Bar in header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-20 pt-10 md:pt-16 border-t border-slate-50">
          {[
            { label: "Comisiones Top", value: "Sin Límite", icon: Coins },
            { label: "Formación", value: "Constante", icon: GraduationCap },
            { label: "Horarios", value: "Flexibles", icon: Clock },
            { label: "Crecimiento", value: "Acelerado", icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#0040FF] group-hover:scale-110 transition-all">
                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-[#0040FF] group-hover:text-white" />
              </div>
              <span className="text-xl md:text-2xl font-black text-neutral-800 mb-1 leading-none">{stat.value}</span>
              <span className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Value Proposition Section */}
      <section className="py-24 max-w-[1700px] mx-auto px-4 lg:px-8 w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -mr-32 -mt-32 -z-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="h-14 w-14 bg-[#0040FF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
               <Zap className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-800 leading-tight">
              ¿Por qué unirte a la <br /> <span className="text-[#0040FF]">Red Casaty Honecta®</span>?
            </h2>
            <div className="space-y-6 text-neutral-500 font-medium text-lg leading-relaxed">
              <p>
                En Casaty, entendemos que el éxito de un agente inmobiliario depende de las herramientas y el respaldo que tiene detrás. Por eso, te ofrecemos la tecnología más avanzada del mercado y un plan de entrenamiento que te llevará de 0 a 100.
              </p>
              <p>
                Nuestra cultura se basa en la colaborarión y la <span className="text-neutral-800 font-black">meritocracia total</span>. Aquí, tu esfuerzo se traduce directamente en ingresos y libertad.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Plan de Carrera", desc: "Escala según tus resultados.", icon: Trophy },
                { title: "Marketing 360", desc: "Campañas pagadas por nosotros.", icon: Globe },
                { title: "Respaldo Legal", desc: "Firma seguro y sin miedos.", icon: ShieldCheck },
                { title: "Comunidad", desc: "Eventos y red de contactos.", icon: Users },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start gap-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-[#0040FF] transition-all group">
                  <item.icon className="h-6 w-6 text-[#0040FF]" />
                  <div>
                    <h4 className="font-black text-neutral-800 text-base leading-tight mb-1">{item.title}</h4>
                    <p className="text-[10px] text-neutral-500 font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group h-[400px] md:h-[700px]"
          >
            <div className="absolute -inset-4 bg-orange-100/30 rounded-[3rem] blur-2xl group-hover:bg-orange-100/50 transition-all duration-500 -z-10" />
            <img 
              src="/Imagenes/reclutamiento-hero.png" 
              alt="Agente con Laptop" 
              className="w-full h-full object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl grayscale-[0.2] transition-all duration-500 group-hover:grayscale-0"
            />
            {/* Overlay badge */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl border border-white/50 animate-bounce-slow">
               <div className="flex items-center gap-3 md:gap-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-green-500 flex items-center justify-center text-white">
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                     <p className="text-xs md:text-sm font-black text-neutral-800">Crecimiento Asegurado</p>
                     <p className="text-[9px] md:text-[10px] text-neutral-500 font-bold uppercase tracking-widest leading-none">Tu éxito es nuestro éxito</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Perks Section (Dark) */}
      <section className="py-24 bg-neutral-900 rounded-[4rem] mx-4 lg:mx-8 mb-24 relative overflow-hidden text-white">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0040FF]/20 rounded-full blur-[120px] -ml-32 -mb-32" />
        <div className="relative z-10 max-w-[1700px] mx-auto px-10">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.3em] mb-4 block">Beneficios Exclusivos</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Lo que ganas al ser un <span className="text-[#0040FF]">Agente Casaty</span>.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Altas Comisiones", 
                desc: "Gana hasta el 80% de la comisión total de cada cierre realizado exitosamente.",
                icon: Coins
              },
              { 
                title: "Capacitación Continua", 
                desc: "Acceso a nuestra academia interna con workshops semanales sobre ventas y legal.",
                icon: GraduationCap
              },
              { 
                title: "Herramientas Digitales", 
                desc: "Acceso premium a CRM inmobiliarios y portales Pro de pago incluidos.",
                icon: Globe
              },
              { 
                title: "Cultura Ganadora", 
                desc: "Reuniones de equipo, premiaciones mensuales y un ambiente de alta motivación.",
                icon: Heart
              }
            ].map((perk, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group group/card">
                 <div className="h-14 w-14 rounded-2xl bg-[#0040FF]/20 flex items-center justify-center mb-8 group-hover/card:bg-[#0040FF] transition-all">
                    <perk.icon className="h-7 w-7 text-[#0040FF] group-hover/card:text-white" />
                 </div>
                 <h3 className="text-xl font-black mb-4">{perk.title}</h3>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Requirements Section */}
      <section className="py-24 max-w-[1700px] mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, x: 0.95 }}
             viewport={{ once: true }}
             className="relative"
           >
              <img 
                src="/Imagenes/exito-agente.png" 
                alt="Agente Feliz" 
                className="w-full h-[600px] object-cover rounded-[3rem] shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border-[1.5rem] border-white/30 rounded-[3rem] m-6" />
           </motion.div>

           <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-black text-neutral-800 leading-tight">¿Tienes el <span className="text-[#0040FF]">perfil</span>?</h2>
              <p className="text-neutral-500 font-medium text-lg leading-relaxed">
                No buscamos currículums perfectos, buscamos actitudes imparables. Si eres proactivo, te gusta el trato con personas y no le temes a los grandes retos, este es tu sitio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   "Actitud ganadora y autogestión.",
                   "Habilidades de comunicación y cierre.",
                   "Manejo de herramientas digitales.",
                   "Residencia en Piura o alrededores.",
                   "Deseo constante de aprendizaje.",
                   "Compromiso ético innegociable."
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="font-bold text-neutral-800 text-sm">{item}</span>
                   </div>
                 ))}
              </div>

              <div className="pt-6">
                <Button size="lg" className="h-16 px-12 text-lg w-full md:w-auto" showArrow>
                  Enviar mi postulación
                </Button>
              </div>
           </div>
        </div>
      </section>

      {/* 5. Final CTA / Recruitment */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-10 shadow-sm border border-blue-100">
              <Briefcase className="h-10 w-10 text-[#0040FF]" />
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-8 leading-tight">Tu nueva vida <br /> empieza con un clic.</h2>
           <p className="text-neutral-500 font-medium text-lg leading-relaxed mb-12">
             No dejes pasar la oportunidad de unirte a la inmobiliaria más movida de Piura. El cielo es el límite y hoy puede ser el primer día de tu éxito.
           </p>
           
           <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Button size="lg" className="h-16 px-12 text-lg bg-[#0040FF] w-full md:w-auto" showArrow>
                Postular por WhatsApp
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-12 text-lg w-full md:w-auto">
                Consultar vacantes
              </Button>
           </div>
        </div>
      </section>
    </main>
  );
}
