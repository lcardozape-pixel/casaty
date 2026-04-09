'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { 
  LeadWizard, 
  WizardStep 
} from "@/components/ui/LeadWizard";
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
  Search,
  Home,
  Building2,
  LandPlot,
  Store,
  User,
  Phone,
  Mail,
  Video,
  Zap,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Pasos genéricos para el Wizard de contacto en Piura
const PIURA_STEPS: WizardStep[] = [
  {
    id: "serviceType",
    question: "¿En qué servicio estás interesado?",
    type: "options",
    options: [
      { id: "vender", label: "Vender una propiedad", icon: Home, value: "Venta" },
      { id: "alquilar", label: "Alquilar mi propiedad", icon: Building2, value: "Alquiler" },
      { id: "comprar", label: "Comprar / Invertir", icon: Search, value: "Compra" },
      { id: "hipoteca", label: "Crédito Hipotecario", icon: Coins, value: "Hipoteca" },
      { id: "tasacion", label: "Tasación Gratuita", icon: FileText, value: "Tasación" },
    ]
  },
  {
    id: "location",
    question: "¿En qué zona de Piura se encuentra la propiedad?",
    type: "options",
    options: [
      { id: "piura", label: "Piura Cercado", icon: MapPin, value: "Piura" },
      { id: "castilla", label: "Castilla", icon: MapPin, value: "Castilla" },
      { id: "26oct", label: "Veintiséis de Octubre", icon: MapPin, value: "26 de Octubre" },
      { id: "otros", label: "Otras zonas", icon: MapPin, value: "Otros" },
    ]
  },
  {
    id: "contact",
    question: "¡Excelente! Déjanos tus datos para brindarte asesoría gratuita",
    type: "input",
    fields: [
      { id: "name", label: "Nombre Completo", icon: User, placeholder: "Ej. María García", type: "text" },
      { id: "phone", label: "WhatsApp / Celular", icon: Phone, placeholder: "Ej. 9XXXXXXXX", type: "tel" },
      { id: "email", label: "Correo Electrónico", icon: Mail, placeholder: "Ej. maria@correo.com", type: "email" },
    ]
  }
];

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

export function InmobiliariaPiuraContent() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 overflow-x-hidden">
      <AnimatePresence>
        {showWizard && (
          <LeadWizard
            title="Asesoría Inmobiliaria en Piura"
            serviceName="Inmobiliaria Piura"
            steps={PIURA_STEPS}
            onClose={() => setShowWizard(false)}
            onComplete={(data) => {
              console.log("Lead captured for Piura:", data);
            }}
          />
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section className="relative min-h-[600px] md:h-[750px] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/Imagenes/piura-panorama.png')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-8">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-xs font-black uppercase tracking-widest">Inmobiliaria Líder en Piura</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Somos una de las mejores inmobiliarias en Piura
            </h1>
            <p className="text-base md:text-xl text-white/90 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
              Te ayudamos a vender, alquilar y gestionar tus propiedades en toda la región. Aplicamos tecnología Casaty Honecta® para garantizar resultados reales en tiempo récord.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" showArrow onClick={() => setShowWizard(true)}>
                Vender mi Propiedad
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20" onClick={() => setShowWizard(true)}>
                Servicios de Alquiler
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-12 md:-mt-16 relative z-30 w-full mb-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 border border-blue-50">
          <div className="flex flex-col items-center lg:items-start border-b lg:border-b-0 lg:border-r border-slate-100 pb-8 lg:pb-0 lg:pr-16 last:border-0 w-full lg:w-auto">
            <h3 className="text-neutral-800 font-black text-2xl mb-2 leading-tight text-center lg:text-left">
              Confianza comprobada <br className="hidden lg:block" /> en el mercado de Piura
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-neutral-800">4.8</span>
              <div className="flex flex-col">
                <div className="flex gap-0.5 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-neutral-500 font-bold text-xs">+320 reseñas en total</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
            <div className="flex flex-col items-center text-center px-4">
              <div className="h-16 w-16 mb-6 bg-blue-50 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-[#0127AC]" />
              </div>
              <h4 className="text-lg font-black text-neutral-800 mb-2">Procesos Seguros</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Respaldo legal completo en cada transferencia y contrato.
              </p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="h-16 w-16 mb-6 bg-green-50 rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-black text-neutral-800 mb-2">Venta Rápida</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Estrategias digitales que aceleran el cierre de negocios.
              </p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="h-16 w-16 mb-6 bg-purple-50 rounded-2xl flex items-center justify-center">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-black text-neutral-800 mb-2">Asesoría 1 a 1</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Acompañamiento personalizado desde el primer día.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="py-20 md:py-32 bg-white w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-6 leading-tight">
              Servicios Inmobiliarios de Alto Impacto
            </h2>
            <p className="text-neutral-500 font-medium max-w-2xl mx-auto text-base md:text-lg">
              Ofrecemos una gestión integral para que tú solo te preocupes por firmar. Resultados garantizados en toda la región de Piura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Compra-Venta", 
                desc: "Maximizamos el precio de tu venta con marketing estratégico.", 
                icon: Home,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              { 
                title: "Alquileres", 
                desc: "Filtramos al inquilino ideal con verificaciones rigurosas.", 
                icon: Building2,
                color: "text-green-600",
                bg: "bg-green-50"
              },
              { 
                title: "Créditos Hipotecarios", 
                desc: "Te conseguimos la mejor tasa del mercado con bancos aliados.", 
                icon: Coins,
                color: "text-orange-600",
                bg: "bg-orange-50"
              },
              { 
                title: "Tasaciones Especializadas", 
                desc: "Conoce el valor real de tu propiedad de forma precisa.", 
                icon: FileText,
                color: "text-purple-600",
                bg: "bg-purple-50"
              }
            ].map((service, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-100 flex flex-col items-start">
                <div className={`h-14 w-14 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-neutral-800 mb-4">{service.title}</h3>
                <p className="text-sm text-neutral-500 font-bold leading-relaxed mb-8 flex-1">{service.desc}</p>
                <button onClick={() => setShowWizard(true)} className="flex items-center gap-2 text-neutral-800 font-black text-sm group/btn">
                  Ver servicio <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Video Testimonial Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-8 leading-tight">
                Lo que dicen nuestros clientes en Piura.
              </h2>
              <p className="text-neutral-500 mb-10 leading-relaxed font-bold text-lg">
                La satisfacción de nuestros clientes es el motor que nos impulsa. Mira cómo hemos transformado la experiencia de venta y alquiler en la ciudad.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-blue-50">
                  <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                    <Star className="h-6 w-6 text-yellow-500 fill-current" />
                  </div>
                  <div>
                    <p className="font-black text-neutral-800 text-lg">"Excedieron mis expectativas"</p>
                    <p className="text-neutral-500 font-bold text-sm">Vendieron mi departamento en Miraflores Country Club en solo 3 semanas.</p>
                  </div>
                </div>
              </div>

              <Button size="lg" showArrow onClick={() => setShowWizard(true)}>
                Ver más testimonios
              </Button>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-black group border-8 border-white">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/RpS2H3ku7P4?autoplay=0&rel=0&modestbranding=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -top-6 -right-6 bg-[#0127AC] p-6 rounded-full shadow-xl hidden md:flex items-center justify-center animate-bounce">
                <Video className="text-white h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-6">¿Por qué somos la mejor opción en Piura?</h2>
            <p className="text-neutral-500 font-medium max-w-2xl mx-auto">Nuestro diferencial radica en la combinación de conocimiento local profundo y herramientas digitales exclusivas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Experiencia Local Real",
                desc: "Conocemos cada urbanización y sector de Piura: Castilla, Los Ejidos, Santa María del Pinar y más.",
                img: "/Imagenes/Imagen-3.webp"
              },
              {
                title: "Marketing Exclusivo",
                desc: "Invertimos en los portales premium y redes sociales para que tu propiedad sea la protagonista.",
                img: "/Imagenes/Imagen-4.webp"
              },
              {
                title: "Transparencia Total",
                desc: "Informes semanales sobre el avance de tu gestión. Sin letras pequeñas ni sorpresas.",
                img: "/Imagenes/legal-seguridad.png"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col group">
                <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-8 shadow-md relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-black text-neutral-800 mb-4">{item.title}</h3>
                <p className="text-neutral-500 font-bold text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQs */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-neutral-800 mb-16 text-center">Preguntas Frecuentes - Inmobiliaria Piura</h2>

          <div className="space-y-4">
            {[
              {
                q: "¿Por qué elegir a Casaty como mi inmobiliaria en Piura?",
                a: "Porque no solo publicamos tu propiedad; diseñamos una estrategia de venta. Utilizamos herramientas de valoración precisas y tenemos una base de datos activa de compradores en Piura."
              },
              {
                q: "¿En qué zonas de Piura trabajan?",
                a: "Cubrimos toda el área metropolitana de Piura: Piura Cercado, Castilla y Veintiséis de Octubre. También gestionamos propiedades exclusivas en zonas como Los Ejidos y urbanizaciones modernas."
              },
              {
                q: "¿Qué tipo de propiedades gestionan?",
                a: "Gestionamos la compra-venta y alquiler de Casas, Departamentos, Terrenos (urbanos y agrícolas) y Locales Comerciales."
              },
              {
                q: "¿Tienen oficina física en Piura?",
                a: "Sí, contamos con presencia local para atenderte personalmente y realizar las visitas de forma inmediata. Contáctanos para agendar una cita en nuestra oficina."
              }
            ].map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section with Premium Gradient */}
      <section className="py-24 bg-gradient-to-br from-[#0127AC] to-[#001D8A] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full -ml-32 -mb-32 blur-2xl" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Listo para dar el siguiente paso en Piura?
          </h2>
          <p className="text-blue-100 font-bold mb-12 text-lg md:text-xl max-w-2xl mx-auto">
            Agenda una asesoría gratuita hoy mismo y descubre cómo podemos ayudarte a lograr tus objetivos inmobiliarios.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="bg-white text-[#0127AC] hover:bg-white/90 w-full sm:w-auto px-12 h-16 text-lg" onClick={() => setShowWizard(true)}>
              Solicitar Asesoría Gratis
            </Button>
            <a href="https://wa.me/51941849523" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full px-12 h-16 text-lg">
                Hablar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


