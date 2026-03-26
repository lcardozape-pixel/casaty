"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/sobre-nosotros" },
  { 
    name: "Corretaje", 
    href: "#", 
    dropdown: [
      { name: "Vender", href: "/vender-casa-en-piura" },
      { name: "Alquilar", href: "/alquilar-mi-casa-departamento-en-piura" },
    ]
  },
  { 
    name: "Servicios", 
    href: "#", 
    dropdown: [
      { name: "Crédito Hipotecario", href: "/solicitar-credito-hipotecario-en-piura" },
      { name: "Tasaciones", href: "/valorizar-mi-inmueble-en-piura" },
      { name: "Contrato de Alquiler", href: "/contrato-de-alquiler" },
    ]
  },
  { name: "Agentes", href: "/agente" },
  { name: "Trabaja con Nosotros", href: "/trabaja-con-nosotros" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm md:bg-white/90 md:backdrop-blur-md h-20">
        <div className="mx-auto max-w-[1700px] h-full flex items-center justify-between px-6 lg:px-10">
          
          {/* LOGO - Left aligned */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <img 
                src="/Logo/logo-dark.webp" 
                alt="Casaty" 
                className="h-9 md:h-11 w-auto" 
              />
            </Link>
          </div>

          {/* DESKTOP MENU - Middle */}
          <div className="hidden lg:flex items-center gap-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <button className="text-[12px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-[#0040FF] flex items-center gap-1.5 transition-all outline-none">
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[12px] font-black uppercase tracking-widest text-neutral-500 hover:text-[#0040FF] transition-all"
                  >
                    {item.name}
                  </Link>
                )}

                {item.dropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-50 overflow-hidden min-w-[260px] p-3">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-6 py-4 text-[13px] font-bold text-neutral-500 hover:bg-slate-50 hover:text-[#0040FF] rounded-2xl transition-all"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - Desktop (CTA) / Mobile (Trigger) */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button variant="primary" size="md" className="rounded-2xl h-11 px-8 shadow-lg shadow-blue-100 font-black uppercase tracking-wider text-[10px]">
                Publicar Propiedad
              </Button>
            </div>

            {/* Mobile Trigger */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center h-11 w-11 rounded-xl text-neutral-800 bg-slate-50 hover:bg-slate-100 transition-all active:scale-95 border border-slate-100"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 lg:hidden transition-opacity duration-300 backdrop-blur-sm",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Content */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-[70] w-full max-w-[300px] bg-white lg:hidden shadow-2xl transition-transform duration-300 ease-in-out sm:ring-1 sm:ring-slate-900/10",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-50">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <img 
              src="/Logo/logo-dark.webp" 
              alt="Casaty Inmobiliaria" 
              className="h-10 w-auto" 
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-neutral-500 hover:text-[#0040FF] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Cerrar menú</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-2 flow-root px-6 overflow-y-auto max-h-[calc(100vh-100px)]">
          <div className="-my-6 divide-y divide-slate-500/10 pb-20">
            <div className="space-y-1 py-6">
              {navigation.map((item) => (
                <div key={item.name} className="py-2">
                  {item.dropdown ? (
                    <>
                      <div className="text-[10px] font-black text-[#0040FF] px-3 py-1 uppercase tracking-[0.2em] opacity-80">
                        {item.name}
                      </div>
                      <div className="mt-2 space-y-1 pl-4 border-l-2 border-slate-100 ml-3">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block rounded-lg px-3 py-2.5 text-base font-bold text-neutral-800 hover:bg-slate-50 hover:text-[#0040FF] transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="-mx-0 block rounded-xl px-4 py-3 text-base font-bold text-neutral-800 hover:bg-blue-50 hover:text-[#0040FF] transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="py-6 pt-10">
              <Button variant="primary" size="md" className="w-full h-14 rounded-2xl shadow-lg shadow-blue-200">
                Publicar Propiedad
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

