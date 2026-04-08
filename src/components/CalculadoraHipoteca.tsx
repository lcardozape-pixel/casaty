'use client';

import { useState, useEffect, useMemo } from "react";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculadoraHipotecaProps {
  priceSoles: number;
  priceDollars: number;
  initialCurrency: 'PEN' | 'USD';
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const pct = Math.min(((value - min) / (max - min)) * 100, 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] text-slate-500 font-medium">{label}</span>
        <span className="text-[14px] font-black text-neutral-800 tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-slider w-full"
        style={{
          background: `linear-gradient(to right, #0040FF ${pct}%, #f1f5f9 ${pct}%)`,
        }}
      />
    </div>
  );
}

export default function CalculadoraHipoteca({ priceSoles, priceDollars, initialCurrency }: CalculadoraHipotecaProps) {
  const [currency, setCurrency] = useState<'PEN' | 'USD'>(initialCurrency || 'PEN');
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [interestRate, setInterestRate] = useState(800);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [years, setYears] = useState(20);

  useEffect(() => {
    if (currency === 'PEN') {
      setPropertyPrice(Math.round(priceSoles || 0));
    } else {
      setPropertyPrice(Math.round(priceDollars || (priceSoles ? priceSoles / 3.8 : 0)));
    }
  }, [currency, priceSoles, priceDollars]);

  const rate = interestRate / 100;

  const { monthlyPayment, financedAmount } = useMemo(() => {
    const down = propertyPrice * (downPaymentPercent / 100);
    const principal = propertyPrice - down;
    const mr = rate / 100 / 12;
    const n = years * 12;

    if (principal <= 0 || n <= 0) return { monthlyPayment: 0, financedAmount: 0 };
    if (mr === 0) return { monthlyPayment: principal / n, financedAmount: principal };

    const pmt = (principal * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
    return { monthlyPayment: isNaN(pmt) ? 0 : pmt, financedAmount: principal };
  }, [propertyPrice, rate, downPaymentPercent, years]);

  const sym = currency === 'PEN' ? 'S/' : '$';
  const fmt = (v: number) => `${sym}${Math.round(isNaN(v) ? 0 : v).toLocaleString("en-US")}`;
  const maxPrice = currency === 'PEN' ? 5000000 : 1500000;
  const priceStep = currency === 'PEN' ? 10000 : 5000;

  return (
    <>
      <style jsx>{`
        .calc-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid #0040FF;
          box-shadow: 0 2px 6px rgba(0,64,255,0.2);
          cursor: pointer;
        }
      `}</style>

      {/* Tarjeta con estilo idéntico a ScheduleVisitSection */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/50 max-w-5xl mx-auto overflow-hidden flex flex-col lg:flex-row mt-12 min-h-[460px]">
        
        {/* Lado Izquierdo - Configuración */}
        <div className="flex-1 flex flex-col pr-0 lg:pr-12">
          <h3 className="text-2xl font-black text-neutral-800 tracking-tight mb-10">
            Calcula tu cuota mensual
          </h3>

          <div className="space-y-8 flex-1">
            <Slider
              label="Valor del inmueble"
              value={propertyPrice}
              min={0}
              max={maxPrice}
              step={priceStep}
              onChange={setPropertyPrice}
              display={fmt(propertyPrice)}
            />
            <Slider
              label="Cuota inicial"
              value={downPaymentPercent}
              min={0}
              max={90}
              step={5}
              onChange={setDownPaymentPercent}
              display={`${downPaymentPercent}% (${fmt(propertyPrice * downPaymentPercent / 100)})`}
            />
            <Slider
              label="Tasa de interés (TEA)"
              value={interestRate}
              min={100}
              max={2500}
              step={25}
              onChange={setInterestRate}
              display={`${rate.toFixed(2)}%`}
            />
            <Slider
              label="Plazo del crédito"
              value={years}
              min={1}
              max={30}
              step={1}
              onChange={setYears}
              display={`${years} ${years === 1 ? 'año' : 'años'}`}
            />
          </div>

          <p className="text-[11px] text-neutral-400 font-medium mt-10 opacity-70 italic leading-relaxed">
            * Valor referencial sujeto a evaluación crediticia de tu entidad financiera.
          </p>
        </div>

        {/* Lado Derecho - Resultados */}
        <div className="w-full lg:w-[400px] bg-slate-50/70 p-8 md:p-10 rounded-3xl flex flex-col border border-slate-100 mt-10 lg:mt-0">
          
          {/* Selector de Moneda */}
          <div className="inline-flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm self-start mb-10">
            <button
              onClick={() => setCurrency('PEN')}
              className={cn(
                "px-6 py-2 rounded-lg text-[11px] font-black transition-all duration-300",
                currency === 'PEN' ? "bg-slate-50 text-[#0040FF]" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Soles
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={cn(
                "px-6 py-2 rounded-lg text-[11px] font-black transition-all duration-300",
                currency === 'USD' ? "bg-slate-50 text-[#0040FF]" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Dólares
            </button>
          </div>

          <div className="space-y-10 flex-1 flex flex-col justify-center">
            {/* Monto de Cuota */}
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 bg-white border border-blue-50 rounded-2xl flex items-center justify-center text-[#0040FF] shadow-md shrink-0">
                <Calculator className="h-7 w-7" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-3xl md:text-4xl font-black text-[#0040FF] tracking-tighter leading-none">
                  {fmt(monthlyPayment)}
                </p>
                <span className="text-[14px] font-bold text-slate-400 lowercase mt-1">mensual</span>
              </div>
            </div>

            <div className="h-px bg-slate-200/50 w-full" />

            {/* Detalles */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-medium text-slate-500 tracking-tight">Valor financiado:</span>
                <span className="text-[15px] font-black text-neutral-800">{fmt(financedAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-medium text-slate-500 tracking-tight">Pago mensual:</span>
                <span className="text-[15px] font-black text-neutral-800">{fmt(monthlyPayment)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-medium text-slate-500 tracking-tight">Plazo préstamo:</span>
                <span className="text-[15px] font-black text-neutral-800">{years} años</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-medium text-slate-500 tracking-tight">Tasa (TEA):</span>
                <span className="text-[15px] font-black text-neutral-800">{rate.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
