'use client';

import { useState, useEffect, useMemo } from "react";
import { Calculator, Percent, CalendarDays, Wallet, TrendingDown, DollarSign } from "lucide-react";

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
  icon,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display: string;
  icon: React.ReactNode;
}) {
  const pct = Math.min(((value - min) / (max - min)) * 100, 100);

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 hover:border-slate-200 hover:shadow-sm transition-all">
      <style jsx>{`
        .calc-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        /* Webkit (Chrome, Safari, Edge) */
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #0127AC;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          cursor: pointer;
          margin-top: -1px; /* Centrar respecto a la barra de 4px */
        }
        /* Firefox */
        .calc-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #0127AC;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          cursor: pointer;
          border-radius: 50%;
        }
        .calc-slider::-moz-range-track {
          height: 4px;
          border-radius: 999px;
        }
      `}</style>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#0127AC]/10 flex items-center justify-center text-[#0127AC] shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-[13px] text-neutral-500 font-medium">{label}</span>
          <span className="text-[14px] font-black text-neutral-800 tabular-nums">{display}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-slider"
        style={{
          background: `linear-gradient(to right, #0127AC ${pct}%, #f1f5f9 ${pct}%)`,
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
    <div className="mt-10 pt-8 border-t border-slate-100">
      {/* Header con estilo consistente */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="h-10 w-10 bg-[#0127AC]/10 rounded-lg flex items-center justify-center text-[#0127AC] shrink-0">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-neutral-800 leading-none mb-1">Calculadora Hipotecaria</h3>
            <p className="text-sm text-neutral-500 font-medium tracking-tight">Estima tu cuota mensual de financiamiento</p>
          </div>
        </div>

        {/* Selector de Moneda */}
        <div className="flex bg-white p-1 rounded-lg border border-slate-100 shadow-sm w-full md:w-auto">
          <button
            onClick={() => setCurrency('PEN')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-[12px] font-bold transition-all duration-200 ${
              currency === 'PEN'
                ? 'bg-[#0127AC] text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Soles
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-[12px] font-bold transition-all duration-200 ${
              currency === 'USD'
                ? 'bg-[#0127AC] text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Dólares
          </button>
        </div>
      </div>

      {/* Grid: Controles + Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Lado Izquierdo - Sliders (3 cols) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Slider
            label="Valor del inmueble"
            value={propertyPrice}
            min={0}
            max={maxPrice}
            step={priceStep}
            onChange={setPropertyPrice}
            display={fmt(propertyPrice)}
            icon={<DollarSign className="h-4 w-4" />}
          />
          <Slider
            label="Cuota inicial"
            value={downPaymentPercent}
            min={0}
            max={90}
            step={5}
            onChange={setDownPaymentPercent}
            display={`${downPaymentPercent}% (${fmt(propertyPrice * downPaymentPercent / 100)})`}
            icon={<TrendingDown className="h-4 w-4" />}
          />
          <Slider
            label="Tasa de interés (TEA)"
            value={interestRate}
            min={100}
            max={2500}
            step={25}
            onChange={setInterestRate}
            display={`${rate.toFixed(2)}%`}
            icon={<Percent className="h-4 w-4" />}
          />
          <Slider
            label="Plazo del crédito"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            display={`${years} ${years === 1 ? 'año' : 'años'}`}
            icon={<CalendarDays className="h-4 w-4" />}
          />
        </div>

        {/* Lado Derecho - Resultado (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6 flex flex-col justify-between">
          {/* Cuota mensual destacada */}
          <div>
            <p className="text-[13px] text-neutral-400 font-bold uppercase tracking-wider mb-2">Tu cuota mensual</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl md:text-4xl font-black text-[#0127AC] tracking-tighter leading-none">
                {fmt(monthlyPayment)}
              </p>
              <span className="text-[13px] font-bold text-neutral-400">/mes</span>
            </div>
          </div>

          {/* Desglose */}
          <div className="mt-6 space-y-3 pt-5 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-neutral-500">Valor financiado</span>
              <span className="text-[13px] font-black text-neutral-800">{fmt(financedAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-neutral-500">Cuota inicial</span>
              <span className="text-[13px] font-black text-neutral-800">{fmt(propertyPrice * downPaymentPercent / 100)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-neutral-500">Plazo</span>
              <span className="text-[13px] font-black text-neutral-800">{years} años ({years * 12} cuotas)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-neutral-500">Tasa (TEA)</span>
              <span className="text-[13px] font-black text-neutral-800">{rate.toFixed(2)}%</span>
            </div>
          </div>

          {/* Nota legal */}
          <p className="text-[10px] text-neutral-400 font-medium mt-5 leading-relaxed">
            * Cálculo referencial sujeto a evaluación crediticia de tu entidad financiera.
          </p>
        </div>
      </div>
    </div>
  );
}
