'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Key, CreditCard, Search, Users, ChevronRight, Zap, Target, ShieldCheck, History } from 'lucide-react';
import { motion } from "framer-motion";

const services = [
  {
    title: 'Compra-Venta de Propiedades',
    description: 'Te acompañamos en todo el proceso de compra o venta, asegurando las mejores condiciones y un trato justo.',
    icon: Home,
    buttonText: 'Solicitar Servicio',
    href: '/vender-casa-en-piura'
  },
  {
    title: 'Alquiler de Inmuebles',
    description: 'Conectamos a propietarios con los inquilinos ideales y ayudamos a arrendatarios a encontrar su hogar perfecto.',
    icon: Key,
    buttonText: 'Solicitar Servicio',
    href: '/alquilar-mi-casa-departamento-en-piura'
  },
  {
    title: 'Créditos Hipotecarios',
    description: 'Te asesoramos para encontrar el financiamiento ideal para tu nueva propiedad, con las mejores tasas y condiciones del mercado.',
    icon: CreditCard,
    buttonText: 'Solicitar Servicio',
    href: '/solicitar-credito-hipotecario-en-piura'
  },
  {
    title: 'Tasaciones Inmobiliarias',
    description: 'Realizamos valoraciones precisas y certificadas de tus inmuebles, basadas en un profundo conocimiento del mercado local.',
    icon: Search,
    buttonText: 'Solicitar Servicio',
    href: '/valorizar-mi-inmueble-en-piura'
  },
  {
    title: 'Únete a Casaty',
    description: 'Forma parte de nuestro equipo de éxito. Ofrecemos oportunidades de carrera para agentes inmobiliarios apasionados.',
    icon: Users,
    buttonText: 'Postula a Casaty',
    href: '/trabaja-con-nosotros'
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements - Optimized without blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/10 rounded-full -mr-32 -mt-32 -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/10 rounded-full -ml-32 -mb-32 -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.3em] mb-4 block">Nuestros Servicios</span>
             <h2 className="text-3xl md:text-4xl font-black text-neutral-800 mb-6 leading-tight">
               Soluciones Inmobiliarias de <br className="hidden md:block" /> <span className="text-[#0040FF]">Siguiente Generación</span>.
             </h2>
             <p className="text-neutral-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
               Desde la compra de tu primer hogar hasta el blindaje legal de tus contratos, Casaty es tu aliado estratégico en Piura.
             </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-[#0040FF]/20 transition-all duration-500 flex flex-col items-start relative overflow-hidden"
            >
               {/* Animated background decoration */}
               <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-slate-50 rounded-full -z-10 group-hover:bg-blue-50 transition-colors duration-500" />
               
               <div className="h-16 w-16 bg-slate-50 text-[#0040FF] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0040FF] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-blue-200 group-hover:scale-110">
                 <service.icon className="h-8 w-8" />
               </div>

               <h3 className="text-2xl font-black text-neutral-800 mb-4 leading-tight group-hover:text-[#0040FF] transition-colors">
                 {service.title}
               </h3>
               
               <p className="text-neutral-500 mb-10 leading-relaxed font-bold text-sm h-16">
                 {service.description}
               </p>

               <Link 
                 href={service.href}
                 className="mt-auto group/btn flex items-center gap-3 text-[#0040FF] font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-all duration-300"
               >
                 <span className="pb-1 border-b-2 border-[#0040FF]">{service.buttonText}</span>
                 <ChevronRight className="h-4 w-4" />
               </Link>
            </motion.div>
          ))}

          {/* Special "Net Honecta" Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="group bg-neutral-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-white/5 hover:shadow-2xl transition-all duration-500 flex flex-col items-start relative overflow-hidden col-span-1 md:col-span-1"
          >
             <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#0040FF]/20 rounded-full blur-3xl" />
             
             <div className="h-16 w-16 bg-[#0040FF] text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
               <Zap className="h-8 w-8" />
             </div>

             <h3 className="text-2xl font-black text-white mb-4 leading-tight">
               Busca en la Red <br /> <span className="text-[#0040FF]">Honecta®</span> 
             </h3>
             
             <p className="text-slate-400 mb-10 leading-relaxed font-bold text-sm">
               Accede a un inventario digital exclusivo de más de 1,000 propiedades en todo el país, conectado en tiempo real.
             </p>

             <Link 
               href="/agente"
               className="mt-auto flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-all duration-300"
             >
               <span className="pb-1 border-b-2 border-white">Explorar Red Completa</span>
               <ChevronRight className="h-4 w-4" />
             </Link>
          </motion.div>
        </div>

        {/* Final Trust Text */}
        <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-slate-200 grid grid-cols-1 md:flex md:items-center md:justify-between gap-8 md:gap-12 opacity-80 filter grayscale brightness-50 contrast-125">
           <div className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-neutral-800" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-800">Cero Comisiones Ocultas</span>
           </div>
           <div className="flex items-center gap-4">
              <History className="h-6 w-6 text-neutral-800" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-800">Desde 2014 Liderando el Mercado</span>
           </div>
           <div className="flex items-center gap-4">
              <Target className="h-6 w-6 text-neutral-800" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-800">Estrategia Comercial a Medida</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
