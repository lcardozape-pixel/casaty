'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import {
  Phone,
  Mail,
  Award,
  MapPin,
  Search,
  Filter,
  MessageSquare,
  Star,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Zap,
  Globe,
  Briefcase,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";

// Fictitious data for now
const INITIAL_AGENTS = [
  {
    id: 1,
    name: "Carlos Sánchez",
    role: "Director Comercial",
    image: "/Imagenes/agente-1.png",
    experience: "12 años",
    specialty: "Inversiones y Terrenos",
    rating: 4.9,
    properties: 42,
    whatsapp: "51900000000"
  },
  {
    id: 2,
    name: "María Elena García",
    role: "Asesora Senior",
    image: "/Imagenes/agente-2.png",
    experience: "8 años",
    specialty: "Residencial Premium",
    rating: 5.0,
    properties: 28,
    whatsapp: "51900000001"
  },
  {
    id: 3,
    name: "Jorge Luis Paz",
    role: "Especialista en Alquileres",
    image: "/Imagenes/equipo-casaty.png", // Reusing team image for variety if needed
    experience: "5 años",
    specialty: "Locales Comerciales",
    rating: 4.8,
    properties: 35,
    whatsapp: "51900000002"
  },
];

export default function AgentesPage() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("Todas");

  // Placeholder for Honecta API Integration
  useEffect(() => {
    // const fetchAgents = async () => {
    //   const response = await fetch('https://api.honecta.com/v1/agents?companyId=casaty');
    //   const data = await response.json();
    //   setAgents(data);
    // };
    // fetchAgents();
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === "Todas" || agent.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* 1. Header (Sin Hero Image como pidió el usuario) */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 max-w-[1700px] mx-auto px-4 lg:px-8 w-full bg-white border-b border-slate-100 rounded-b-[3rem] md:rounded-b-[4rem] shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.3em] mb-4 block">Nuestro Equipo</span>
            <h1 className="text-3xl md:text-7xl font-black text-neutral-800 mb-6 md:mb-8 leading-[1.1] tracking-tighter">
              Asesores de Clase <br className="hidden md:block" /> <span className="text-[#0040FF]">Mundial</span>.
            </h1>
            <p className="text-base md:text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
              No solo vendemos casas, construimos confianza. Encuentra al agente ideal para tu próxima inversión en Piura.
            </p>
          </motion.div>
        </div>

        {/* 2. Filter Bar */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-20 p-4 bg-slate-50 border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row gap-4 items-center shadow-inner">
           <div className="relative flex-1 w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Buscar agente..."
                className="w-full h-14 md:h-16 pl-14 pr-8 bg-white border-none rounded-2xl md:rounded-3xl font-bold text-neutral-800 focus:ring-2 focus:ring-[#0040FF] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <select 
                className="h-14 md:h-16 px-6 md:px-8 bg-white border-none rounded-2xl md:rounded-3xl font-black text-neutral-800 text-xs md:text-sm focus:ring-2 focus:ring-[#0040FF] transition-all cursor-pointer appearance-none min-w-[150px] md:min-w-[180px]"
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
              >
                 <option>Todas</option>
                 <option>Inversiones y Terrenos</option>
                 <option>Residencial Premium</option>
                 <option>Locales Comerciales</option>
              </select>
              <div className="h-14 w-14 md:h-16 md:w-16 bg-[#0040FF] rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-200 cursor-pointer hover:scale-105 transition-transform">
                 <Filter className="h-5 w-5 md:h-6 md:w-6" />
              </div>
           </div>
        </div>
      </section>

      {/* 3. Agents Grid */}
      <section className="py-24 max-w-[1700px] mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
               {/* Image Wrapper */}
               <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  {/* Floating Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                     <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-black text-neutral-800 text-xs">{agent.rating}</span>
                     </div>
                     <div className="bg-green-500/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-white" />
                        <span className="font-black text-white text-[9px] uppercase tracking-widest leading-none">Verificado</span>
                     </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-10 left-10 right-10 text-white opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-500">
                     <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">Experto en:</p>
                     <p className="text-xl font-black leading-tight">{agent.specialty}</p>
                  </div>
               </div>

               {/* Content wrapper */}
               <div className="p-10 flex-1 flex flex-col">
                  <div className="mb-8">
                     <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.2em] mb-2 block">{agent.role}</span>
                     <h3 className="text-2xl md:text-3xl font-black text-neutral-800 mb-2 leading-tight">{agent.name}</h3>
                     <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold">
                        <MapPin className="h-3 w-3" />
                        <span>Piura, Perú</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                     <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Experiencia</p>
                        <p className="font-black text-neutral-800 text-sm leading-none">{agent.experience}</p>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Propiedades</p>
                        <p className="font-black text-neutral-800 text-sm leading-none">{agent.properties} Activas</p>
                     </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                     <Button 
                       size="lg" 
                       className="w-full bg-[#0040FF] transition-all"
                       showArrow
                     >
                       WhatsApp de {agent.name.split(' ')[0]}
                     </Button>
                     <Button 
                       variant="outline" 
                       size="lg" 
                       className="w-full border-slate-200 text-neutral-500 hover:bg-slate-50"
                     >
                       <Mail className="h-4 w-4 mr-2" />
                       Ver Perfil Completo
                     </Button>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Join the Team Section (CTA) */}
      <section className="py-24 bg-neutral-900 rounded-[4rem] mx-4 lg:mx-8 mb-24 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0040FF]/20 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="relative z-10 max-w-[1700px] mx-auto px-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-[0.3em] mb-4 block">¿Eres Agente?</span>
                 <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Únete al Equipo que está <br /> <span className="text-[#0040FF]">Reinventando la Ciudad</span>.</h2>
                 <p className="text-slate-400 font-medium text-lg leading-relaxed mb-10 max-w-xl">
                   Si eres un agente profesional buscando las mejores herramientas y comisiones de Piura, queremos hablar contigo.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="bg-white text-neutral-900 hover:bg-slate-100 w-full md:w-auto px-12" showArrow>
                       Ver Vacantes
                    </Button>
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-3xl">
                       <Zap className="h-6 w-6 text-[#0040FF]" />
                       <span className="font-black text-white text-xs uppercase tracking-widest">Respaldo Honecta®</span>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 {[
                   { label: "Cierres / Mes", val: "15+", icon: TrendingUp },
                   { label: "Países", val: "Latam", icon: Globe },
                   { label: "Proyectos Propios", val: "05", icon: Briefcase },
                   { label: "Soporte 24/7", val: "Legal", icon: ShieldCheck },
                 ].map((stat, i) => (
                   <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                      <stat.icon className="h-6 w-6 text-[#0040FF] mb-4" />
                      <p className="text-2xl font-black mb-1">{stat.val}</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Recruitment CTA simple footer */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-black text-neutral-800 mb-6">¿Deseas atención inmediata?</h2>
           <p className="text-neutral-500 font-medium text-lg leading-relaxed mb-12">
             Habla hoy mismo con nuestra central para que te asignemos al experto ideal según el tipo de propiedad que estás buscando.
           </p>
           <Button size="lg" className="bg-[#0040FF]" showArrow>
             Hablar con Central Casaty
           </Button>
        </div>
      </section>
    </main>
  );
}
