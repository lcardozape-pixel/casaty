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
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center group">
            <img 
              src="/Logo/logo-dark.webp" 
              alt="Casaty Inmobiliaria" 
              className="h-10 md:h-12 w-auto" 
            />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-500"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-6 items-center">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.dropdown ? (
                <button className="text-sm font-semibold leading-6 text-neutral-800 group-hover:text-primary flex items-center gap-1 transition-colors cursor-pointer outline-none">
                  {item.name}
                  <ChevronDown className="h-4 w-4 transform group-hover:rotate-180 transition-transform" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-neutral-800 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}

              {item.dropdown && (
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden min-w-[200px] p-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors"
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

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button variant="primary" size="md">
            Publicar Propiedad
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-50 bg-white px-6 py-6 lg:hidden transition-transform duration-300",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <img 
              src="/Logo/logo-dark.webp" 
              alt="Casaty Inmobiliaria" 
              className="h-10 w-auto" 
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-neutral-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Cerrar menú</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-slate-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <div key={item.name} className="py-2">
                  {item.dropdown ? (
                    <>
                      <div className="text-base font-bold text-neutral-500 px-3 py-2 uppercase tracking-wider text-[10px]">
                        {item.name}
                      </div>
                      <div className="mt-1 space-y-1 pl-4 border-l-2 border-slate-100 ml-3">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-800 hover:bg-slate-50"
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
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-800 hover:bg-slate-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="py-6">
              <Button variant="primary" size="md" className="w-full">
                Publicar Propiedad
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

