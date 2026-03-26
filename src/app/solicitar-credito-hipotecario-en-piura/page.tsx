'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  TrendingUp,
  Percent,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Star,
  Users,
  Trophy,
  Landmark,
  FileText,
  Handshake,
  DollarSign,
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className={`border border-slate-100 rounded-2xl p-6 transition-all duration-300 cursor-pointer bg-slate-50/50 ${isOpen ? 'border-blue-200 bg-blue-50/30' : 'hover:border-blue-100'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-neutral-800">{question}</span>
        <ChevronDown className={`h-5 w-5 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0040FF]' : ''}`} />
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

function MortgageCalculator() {
  const [price, setPrice] = useState(350000);
  const [initialPercent, setInitialPercent] = useState(10);
  const [initial, setInitial] = useState(35000);
  const [years, setYears] = useState(20);
  const [interest, setInterest] = useState(7.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Update initial value when percent or price changes
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(val).replace('PEN', 'S/');
  };

  useEffect(() => {
    setInitial(Math.round(price * (initialPercent / 100)));
  }, [price, initialPercent]);

  useEffect(() => {
    const loanAmount = price - initial;
    const monthlyRate = interest / 100 / 12;
    const numPayments = years * 12;

    if (loanAmount > 0 && monthlyRate > 0) {
      const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      setMonthlyPayment(payment);
    } else {
      setMonthlyPayment(0);
    }
  }, [price, initial, years, interest]);

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
      <div className="bg-[#0040FF] p-6 md:p-10 text-white text-center">
        <h3 className="text-xl md:text-2xl font-black mb-2 flex items-center justify-center gap-3">
          <Calculator className="h-6 w-6" /> Calculadora Hipotecaria
        </h3>
        <p className="text-blue-100 text-xs md:text-sm font-medium">Estima tu cuota mensual en segundos</p>
      </div>
      
      <div className="p-6 md:p-10 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-black text-neutral-800">Precio del Inmueble (S/)</label>
              <span className="text-[10px] font-black text-[#0040FF]">{formatCurrency(price)}</span>
            </div>
            <input 
              type="text" 
              value={price.toLocaleString('en-US')} 
              onChange={(e) => {
                const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                if (!isNaN(val)) setPrice(val);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-neutral-800 font-bold focus:ring-2 focus:ring-[#0040FF] outline-none"
            />
            <input 
               type="range" min="50000" max="2000000" step="10000" 
               value={price} onChange={(e) => setPrice(Number(e.target.value))}
               className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0040FF]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-black text-neutral-800">Cuota Inicial (S/)</label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-neutral-400">{formatCurrency(initial)}</span>
                <span className="text-xs font-black text-green-600">{initialPercent}%</span>
              </div>
            </div>
            <input 
              type="text" 
              value={initial.toLocaleString('en-US')} 
              onChange={(e) => {
                const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                if (!isNaN(val)) {
                  setInitial(val);
                  setInitialPercent(Math.round((val / price) * 100));
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-neutral-800 font-bold focus:ring-2 focus:ring-[#0040FF] outline-none"
            />
            <div className="space-y-2">
              <input 
                type="range" min="10" max="35" step="5" 
                value={initialPercent} onChange={(e) => setInitialPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-[8px] font-black text-neutral-400 uppercase tracking-tighter">
                <span>10%</span>
                <span>15%</span>
                <span>20%</span>
                <span>25%</span>
                <span>30%</span>
                <span>35%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-black text-neutral-800">Plazo (Años)</label>
            <div className="flex gap-4">
               {[5, 10, 15, 20, 25].map(y => (
                 <button 
                  key={y}
                  onClick={() => setYears(y)}
                  className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${years === y ? 'bg-[#0040FF] text-white shadow-lg' : 'bg-slate-100 text-neutral-500 hover:bg-slate-200'}`}
                 >
                   {y}
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-black text-neutral-800">Tasa de Interés Anual (TEA %)</label>
            <input 
              type="number" 
              step="0.1"
              value={interest} 
              onChange={(e) => setInterest(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-neutral-800 font-bold focus:ring-2 focus:ring-[#0040FF] outline-none"
            />
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none text-right">Tasa Promedio Actual: 7.5% - 9.5%</p>
          </div>
        </div>

        <div className="bg-[#eff6ff] rounded-[2rem] p-8 text-center border border-blue-100">
          <p className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-2 leading-none">Tu Cuota Mensual Estimada</p>
          <p className="text-5xl font-black text-[#0040FF] leading-none mb-4">{formatCurrency(monthlyPayment)}</p>
          <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-xs mx-auto">
            * Referencial. Sujeto a evaluación crediticia y comisiones de desgravamen/seguro de inmueble.
          </p>
        </div>

        <Button size="lg" className="w-full" showArrow>
          Solicitar Pre-Calificación Gratis
        </Button>
      </div>
    </div>
  );
}

export default function CreditoPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* 1. Hero Section */}
      <section className="relative h-[500px] md:h-[650px] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/Imagenes/credito-hipotecario-hero.png')",
            filter: "brightness(0.5)"
          }}
        />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-6xl font-black mb-6 leading-tight">
              Consigue el Crédito para tu <br /> <span className="text-[#0040FF]">Próximo Hogar</span>
            </h1>
            <p className="text-sm md:text-xl text-white/90 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
              Asesoría gratuita y pre-calificación digital en 48 horas. Trabajamos con los principales bancos locales para conseguirte la mejor tasa del mercado.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" showArrow>
                Calificar Ahora
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-neutral-800 border-none">
                Ver Guía Hipotecaria
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Stats Bar */}
      <section className="max-w-[1700px] mx-auto px-4 lg:px-8 -mt-16 relative z-30 w-full mb-12">
        <div className="bg-[#eff6ff] rounded-[2.5rem] shadow-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12 border border-blue-100">
          <div className="flex flex-col items-center lg:items-start border-b lg:border-b-0 lg:border-r border-blue-200/50 pb-8 lg:pb-0 lg:pr-16 last:border-0 w-full lg:w-auto">
            <h3 className="text-neutral-800 font-black text-2xl mb-1 leading-tight text-center lg:text-left">
              +15M de soles <br className="hidden lg:block" /> desembolsados en Piura
            </h3>
            <p className="text-neutral-500 font-bold text-sm mb-4">Aprobación del 92% de casos</p>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                <BadgeCheck className="text-white h-7 w-7" />
              </div>
              <div>
                <p className="font-black text-neutral-800 text-lg">Asesoría 100% Gratis</p>
                <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest">Sin costos ocultos</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                <Landmark className="h-8 w-8 text-[#0040FF]" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Multibanco</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Comparamos ofertas de todos los bancos en un solo lugar.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                <Percent className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Tasas Preferenciales</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Acceso a convenios corporativos con beneficios exclusivos.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <h4 className="text-base font-black text-neutral-800 mb-2">Agilidad Total</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-bold">
                Respuesta y pre-calificación en tiempo récord.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mortgage Calculator Section */}
      <section className="py-16 md:py-24 max-w-[1700px] mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2 className="text-2xl md:text-5xl font-black text-neutral-800 mb-6 leading-tight">
              Planifica tu futuro financiero hoy mismo.
            </h2>
            <p className="text-neutral-500 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-lg">
              No dejes nada al azar. Nuestra calculadora hipotecaria te ayuda a proyectar tus pagos mensuales para que puedas tomar la mejor decisión sin comprometer tu presupuesto familiar.
            </p>

            <div className="space-y-6">
              {[
                { title: "Bonos del Estado", desc: "Te ayudamos a aplicar al Bono del Buen Pagador (BBP) y MiVivienda.", icon: Trophy },
                { title: "Hipoteca Plus Casaty", desc: "Descuentos exclusivos en gastos notariales y registrales.", icon: Landmark },
                { title: "Evaluación sin costo", desc: "Sin cuotas de apertura ni penalidades por cancelación anticipada.", icon: ShieldCheck },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="h-12 w-12 shrink-0 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-[#0040FF]" />
                  </div>
                  <div>
                    <h4 className="font-black text-neutral-800 text-lg leading-tight mb-2">{item.title}</h4>
                    <p className="text-sm text-neutral-500 font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <MortgageCalculator />
          </motion.div>
        </div>
      </section>

      {/* 4. Process Step by Step */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-[1700px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-4">Tu Crédito en 4 pasos</h2>
          <p className="text-neutral-500 font-medium mb-16 max-w-2xl mx-auto">
            Simplificamos el complejo mundo bancario para que tú solo te preocupes por decorar tu nuevo hogar.
          </p>

          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute left-[20px] top-4 bottom-12 w-[1.5px] bg-blue-100 z-0 group-hover:bg-blue-200 transition-colors" />

            <div className="space-y-12 text-left relative z-10">
              {[
                {
                  title: "Pre-calificación Digital",
                  desc: "Evaluamos tu perfil financiero de manera gratuita para conocer tu capacidad real de compra.",
                  icon: Landmark
                },
                {
                  title: "Selección de Opción Ganadora",
                  desc: "Comparamos las tasas de 5 bancos distintos y elegimos juntos la que más te convenga.",
                  icon: Percent
                },
                {
                  title: "Gestión Documentaria Inteligente",
                  desc: "Te ayudamos a recopilar y ordenar todos los requisitos legales y laborales del banco.",
                  icon: FileText
                },
                {
                  title: "Firma y Desembolso",
                  desc: "Acompañamiento personalizado en la firma de minuta y escritura pública en notaría.",
                  icon: Handshake
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-start group/item">
                  <div className="h-10 w-10 shrink-0 bg-blue-50 text-[#0040FF] flex items-center justify-center rounded-full font-black shadow-sm border border-blue-100 group-hover/item:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-black text-neutral-800 leading-tight mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-500 font-bold leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-8 items-start">
                <div className="h-10 w-10 shrink-0 bg-green-500 text-white flex items-center justify-center rounded-full font-black shadow-md border border-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-black text-green-600 leading-tight mb-2">¡Saca las llaves!</h3>
                  <p className="text-sm text-neutral-500 font-bold mb-8">Felicidades, tu propiedad ya cuenta con financiamiento seguro 🙂</p>
                  <Button size="lg" showArrow>
                    Empezar evaluación ahora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1700px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-neutral-800 mb-16">
            ¿Por qué gestionar tu crédito con Casaty?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Asesoría Experta",
                desc: "Asesores hipotecarios con más de 10 años de experiencia en el sistema bancario peruano.",
                icon: Briefcase
              },
              {
                title: "Convenios Bancarios",
                desc: "Acceso a tasas preferenciales exclusivas para clientes de la red Casaty Honecta®.",
                icon: Building2
              },
              {
                title: "Acompañamiento Total",
                desc: "No te dejamos solo. Te guiamos desde el formulario inicial hasta la entrega de llaves.",
                icon: ShieldCheck
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 text-left hover:shadow-xl transition-all group">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-[#0040FF] transition-colors">
                  <benefit.icon className="h-7 w-7 text-[#0040FF] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-neutral-800 mb-4">{benefit.title}</h3>
                <p className="text-sm text-neutral-500 font-bold leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQs */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-neutral-800 mb-16">Preguntas frecuentes sobre Crédito Hipotecario</h2>

          <div className="space-y-4 text-left">
            {[
              {
                q: "¿Qué requisitos mínimos necesito para calificar?",
                a: "Generalmente, necesitas demostrar ingresos estables (6 meses boletas o 1 año de rentas de 4ta), estar bien calificado en INFOCORP y tener al menos el 10% del valor del inmueble como cuota inicial."
              },
              {
                q: "¿Cuál es la tasa de interés actual?",
                a: "Las tasas varían según tu perfil de riesgo y el banco, pero actualmente oscilan entre 7.5% y 9.5% TEA. Nosotros negociamos para conseguirte la más baja."
              },
              {
                q: "¿Qué es el Bono del Buen Pagador (BBP)?",
                a: "Es un subsidio del Estado que se otorga a quienes adquieren un crédito Mivivienda. El monto varía según el precio de la vivienda y no se devuelve."
              },
              {
                q: "¿Puedo juntar ingresos con mi pareja?",
                a: "Sí, puedes realizar una solicitud mancomunada (parejas, hermanos o padres e hijos) para aumentar tu capacidad de endeudamiento."
              }
            ].map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 bg-[#eff6ff]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-800 mb-8 leading-tight">
            ¿Listo para dar el gran paso?
          </h2>
          <p className="text-neutral-500 font-bold mb-12 text-lg">
            No pierdas tiempo en colas. Deja que nuestros expertos gestionen tu crédito hipotecario de forma gratuita y eficiente.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button size="lg" showArrow className="w-full md:w-auto px-12">
              Pre-calificar ahora
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto px-12 bg-white">
              Hablar con asesor
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
