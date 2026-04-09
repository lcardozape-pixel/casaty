import { ComplaintsForm } from "@/components/legal/ComplaintsForm";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual | Casaty",
  description: "Accede a nuestro Libro de Reclamaciones Virtual para registrar cualquier queja o reclamo relacionado con nuestros servicios inmobiliarios en Piura.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://casaty.pe/libro-de-reclamaciones",
  },
};

export default function LibroReclamacionesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100 rounded-b-[4rem] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
             <BookOpen className="text-[#0127AC]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-neutral-800 mb-6 tracking-tighter">
            Libro de <br className="hidden md:block" /> <span className="text-[#0127AC]">Reclamaciones</span>.
          </h1>
          <p className="text-base md:text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, ponemos a tu disposición nuestro libro de reclamaciones virtual.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-4 bg-white">
        <ComplaintsForm />
      </section>
    </main>
  );
}


