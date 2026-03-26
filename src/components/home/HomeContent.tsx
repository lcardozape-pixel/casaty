'use client';

import { Hero } from "@/components/features/Hero";
import { PropertyCard } from "@/components/features/PropertyCard";
import { properties } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import ServicesSection from "@/components/home/ServicesSection";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Zap, Building2, Target } from "lucide-react";

export function HomeContent() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 overflow-x-hidden">
      <Hero />
      
      {/* Featured Properties Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-12 w-full border-b border-slate-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="text-left space-y-3 md:space-y-4 max-w-2xl">
            <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.3em] block">Catálogo Exclusivo</span>
            <h2 className="text-2xl md:text-4xl font-black text-neutral-800 leading-[1.1] tracking-tighter">
              Propiedades <br /> <span className="text-[#0040FF]">Destacadas</span>.
            </h2>
            <p className="text-neutral-500 font-medium text-sm md:text-lg leading-relaxed">
              Explora nuestra selección de inmuebles listos para habitar en las mejores urbanizaciones de Piura. Calidad certificada por nuestros expertos.
            </p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" size="lg" className="border-slate-200 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-all font-black" showArrow>
                Ver todo el Catálogo
             </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20">
          {properties.map((property, i) => (
             <motion.div
               key={property.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
             >
               <PropertyCard property={property} />
             </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg" className="border-slate-200 text-neutral-800 hover:bg-slate-100 font-black w-full md:w-auto" showArrow>
            Explorar más de 1,000 unidades
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Honecta Network Call to Action */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-12 w-full mb-16 md:mb-24 relative">
        <div className="bg-neutral-900 rounded-[2rem] md:rounded-[4rem] text-white overflow-hidden relative p-8 md:p-16">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0040FF]/5 rounded-full -mr-64 -mt-64" />
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
               <div>
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                     <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-[#0040FF] flex items-center justify-center">
                        <Zap className="h-5 w-5 md:h-6 md:w-6" />
                     </div>
                     <span className="font-black text-[#0040FF] uppercase tracking-widest text-[10px]">Propulsado por Honecta®</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-6 md:mb-8 leading-[1] tracking-tighter">
                     Toda la Oferta <br className="hidden md:block" /> de Piura en <span className="text-[#0040FF]">Un Solo Lugar</span>.
                  </h2>
                  <p className="text-slate-400 font-medium text-sm md:text-lg leading-relaxed mb-8 md:mb-12 max-w-lg">
                     Nuestra red exclusiva conecta más de 50 agencias y 1,000+ propiedades en tiempo real. Si no está en Casaty, no está en el mercado.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                     <Button size="lg" className="w-full md:w-auto font-black" showArrow>
                        Hablar con un Experto
                     </Button>
                     <div className="flex items-center gap-3 md:gap-4">
                        <div className="flex -space-x-2 md:-space-x-3">
                           {[1,2,3,4].map(i => (
                             <div key={i} className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-neutral-900 bg-slate-400 overflow-hidden shadow-xl">
                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                             </div>
                           ))}
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Atención 24/7</span>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                  {[
                    { label: "Propiedades", val: "1,200+", icon: Star },
                    { label: "Agencias", val: "50+", icon: Building2 },
                    { label: "Satisfacción", val: "99%", icon: ShieldCheck },
                    { label: "Días de Venta", val: "45 Prom.", icon: Target },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-center hover:bg-white/10 transition-all cursor-default">
                       <stat.icon className="h-8 w-8 md:h-10 md:w-10 text-[#0040FF] mx-auto mb-4 md:mb-6" />
                       <h4 className="text-2xl md:text-4xl font-black mb-1">{stat.val}</h4>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
