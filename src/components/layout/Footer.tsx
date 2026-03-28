"use client";

import Link from "next/link";
import { Phone, Facebook, Instagram, Youtube, MapPin, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f8f9fa] text-neutral-500 py-6 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
          <div>
            <h4 className="font-bold text-neutral-800 mb-4">Sobre la empresa</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/sobre-nosotros" className="hover:text-primary transition-colors">Quienes somos</Link></li>
              <li><Link href="/trabaja-con-nosotros" className="hover:text-primary transition-colors">Trabaja como Asesor Inmobiliario</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-neutral-800 mb-4">Otros Servicios</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/valorizar-mi-inmueble-en-piura" className="hover:text-primary transition-colors">Valuar mi inmueble</Link></li>
              <li><Link href="/contrato-de-alquiler" className="hover:text-primary transition-colors">Adquiere tu contrato de alquiler</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-800 mb-4">Servicios en Piura</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/vender-casa-en-piura" className="hover:text-primary transition-colors">Vende tu propiedad en Piura</Link></li>
              <li><Link href="/alquilar-mi-casa-departamento-en-piura" className="hover:text-primary transition-colors">Alquila tu propiedad en Piura</Link></li>
              <li><Link href="/solicitar-credito-hipotecario-en-piura" className="hover:text-primary transition-colors">Obtén tu crédito Hipotecario en Piura</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-800 mb-4">Contácta con Casaty</h4>
            <ul className="space-y-3 text-[13px]">
              <li className="flex items-center gap-3">
                <Phone className="h-3.5 w-3.5 text-neutral-800" />
                <a href="https://wa.link/cr2g9a" target="_blank" rel="noopener noreferrer" className="hover:text-[#0040FF] transition-colors font-medium">941 849 523</a>
              </li>
              <li className="flex items-center gap-3">
                <Facebook className="h-3.5 w-3.5 text-neutral-800" />
                <a href="https://www.facebook.com/casatypiura" target="_blank" rel="noopener noreferrer" className="hover:text-[#0040FF] transition-colors font-medium">Facebook</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-3.5 w-3.5 text-neutral-800" />
                <a href="https://www.instagram.com/casatyperu" target="_blank" rel="noopener noreferrer" className="hover:text-[#0040FF] transition-colors font-medium">Instagram</a>
              </li>
              <li className="flex items-center gap-3">
                <Youtube className="h-3.5 w-3.5 text-neutral-800" />
                <a href="https://www.youtube.com/@casatyperu" target="_blank" rel="noopener noreferrer" className="hover:text-[#0040FF] transition-colors font-medium">Youtube</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-3.5 w-3.5 text-neutral-800 mt-0.5" />
                <a href="https://maps.app.goo.gl/TePoypD73DFK1qGy5" target="_blank" rel="noopener noreferrer" className="hover:text-[#0040FF] transition-colors font-medium leading-tight">
                  Av. Bolognesi 349, Of. 206, Piura
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Certification Logos Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-4 border-t border-slate-200">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-widest">Código: 02172-PJ-MVCS</span>
            <Image 
              src="/Branding/MVCS.webp" 
              alt="Ministerio de Vivienda" 
              width={160}
              height={32}
              className="h-8 w-auto opacity-100"
            />
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-widest">Respaldado por</span>
            <Image 
              src="/Branding/infocorp.webp" 
              alt="Infocorp Equifax" 
              width={120}
              height={24}
              className="h-6 w-auto opacity-100"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <Link href="/">
              <Image 
                src="/Logo/logo-dark.webp" 
                alt="Casaty" 
                width={120}
                height={28}
                className="h-7 w-auto" 
              />
            </Link>
            <span className="text-[10px] text-neutral-500 font-medium">
              © 2025 Todos los derechos reservados a Inmobiliaria Casaty S.A.C | RUC: 20611142979
            </span>
          </div>
          
          <div className="flex gap-6 text-[10px] font-medium text-neutral-500 flex-wrap justify-center md:justify-end">
            <Link href="/terminos-y-condiciones" className="hover:text-[#0040FF] transition-colors">Términos y condiciones</Link>
            <Link href="/politica-de-privacidad" className="hover:text-[#0040FF] transition-colors">Política privacidad</Link>
            <Link href="/politica-de-cookies" className="hover:text-[#0040FF] transition-colors">Política cookies</Link>
            <Link href="/libro-de-reclamaciones" className="hover:text-[#0040FF] transition-colors">Libro de Reclamaciones</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute right-8 bottom-24 md:bottom-12 bg-[#0f2a4a] text-white p-2 rounded shadow-xl hover:bg-primary transition-colors z-20"
        aria-label="Volver arriba"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  );
}

