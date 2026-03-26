"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navigation = [
  { name: "Crédito Hipotecario", href: "/solicitar-credito-hipotecario-en-piura" },
  { name: "Tasaciones", href: "/valorizar-mi-inmueble-en-piura" },
  { name: "Agentes", href: "/agente" },
  { 
    name: "Servicio de Corretaje", 
    href: "#", 
    dropdown: [
      { name: "Vender Propiedad", href: "/vender-casa-en-piura" },
      { name: "Alquilar Propiedad", href: "/alquilar-mi-casa-departamento-en-piura" },
    ]
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm h-20">
        <div className="mx-auto max-w-7xl h-full flex items-center justify-between px-6 lg:px-12">
          
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

          {/* DESKTOP MENU - Right Aligned */}
          <div className="hidden lg:flex items-center gap-x-10">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <button className="text-[13px] font-bold text-neutral-500 group-hover:text-[#0040FF] flex items-center gap-1.5 transition-all outline-none">
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[13px] font-bold text-neutral-500 hover:text-[#0040FF] transition-all"
                  >
                    {item.name}
                  </Link>
                )}

                {item.dropdown && (
                  <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
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

          {/* Mobile Trigger - Only for small screens */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-xl text-neutral-800 bg-white hover:bg-slate-50 transition-all active:scale-95 border border-slate-100 shadow-sm"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
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
              className="h-9 w-auto" 
            />
          </Link>
          <button
            type="button"
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-neutral-500 hover:text-[#0040FF] transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Cerrar menú</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-2 flow-root px-6 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
          <div className="-my-6 divide-y divide-slate-500/10 pb-20">
            <div className="space-y-1 py-6">
              {navigation.map((item) => (
                <div key={item.name} className="py-1">
                  {item.dropdown ? (
                    <div className="py-2">
                      <div className="text-[10px] font-black text-neutral-400 px-4 py-1.5 uppercase tracking-widest opacity-80">
                        {item.name}
                      </div>
                      <div className="mt-1 space-y-0.5 pl-4 border-l-2 border-slate-100 ml-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block rounded-xl px-4 py-3 text-[15px] font-bold text-neutral-800 active:bg-slate-50 active:text-[#0040FF] transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block rounded-2xl px-4 py-4 text-[16px] font-bold text-neutral-800 active:bg-blue-50 active:text-[#0040FF] transition-all flex items-center justify-between group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="-rotate-90 h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {/* Mobile CTA removed for consistency */}
          </div>
        </div>
      </div>
    </>
  );
}

