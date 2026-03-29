"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

interface CalculadoraHipotecaProps {
  priceRaw: string;
  currencySymbol: string;
}

export default function CalculadoraHipoteca({ priceRaw, currencySymbol }: CalculadoraHipotecaProps) {
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Extraer solo números de la cadena de precio (ej: "S/ 168,000" -> 168000)
    const numPrice = Number(priceRaw.replace(/[^0-9.]/g, ""));
    if (!isNaN(numPrice) && numPrice > 0) {
      setPropertyPrice(numPrice);
    }
  }, [priceRaw]);

  useEffect(() => {
    if (propertyPrice === 0) return;

    const principal = propertyPrice - (propertyPrice * (downPaymentPercent / 100));
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
      return;
    }

    // Fórmula de amortización
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(payment);
  }, [propertyPrice, downPaymentPercent, years, interestRate]);

  if (propertyPrice === 0) return null; // No muestra si no hay precio numérico

  const formatCurrency = (val: number) => {
    return `${currencySymbol} ${Math.round(val).toLocaleString("en-US")}`;
  };

  const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
  const principalAmount = propertyPrice - downPaymentAmount;

  return (
    <div className="bg-neutral-50 rounded-3xl p-6 lg:p-8 border border-slate-200 mt-12 w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#0040FF]/10 p-3 rounded-2xl">
          <Calculator className="h-6 w-6 text-[#0040FF]" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-neutral-800">
          Calculadora de Hipoteca
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Sliders de Controles */}
        <div className="space-y-8">
          {/* Precio de Propiedad (solo lectura pero clave visual) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-neutral-600">Precio de la Propiedad</label>
              <span className="font-bold text-neutral-900">{formatCurrency(propertyPrice)}</span>
            </div>
          </div>

          {/* Inicial / Enganche */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-neutral-600">Cuota Inicial ({downPaymentPercent}%)</label>
              <span className="font-bold text-neutral-900">{formatCurrency(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#0040FF]"
            />
          </div>

          {/* Plazo */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-neutral-600">Plazo (Años)</label>
              <span className="font-bold text-neutral-900">{years} años</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#0040FF]"
            />
          </div>

          {/* Tasa de Interés */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-neutral-600">Tasa de Interés Anual</label>
              <span className="font-bold text-neutral-900">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#0040FF]"
            />
          </div>
        </div>

        {/* Resumen de Pago */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Cuota Mensual Estimada
          </p>
          <div className="text-4xl lg:text-5xl font-black text-[#0040FF] mb-6">
            {formatCurrency(monthlyPayment)}
          </div>
          
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-500 font-medium">Monto a financiar</span>
              <span className="text-sm font-bold text-neutral-800">{formatCurrency(principalAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-500 font-medium">Tasa aplicada</span>
              <span className="text-sm font-bold text-neutral-800">{interestRate}% / {years} años</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 mt-8 text-center bg-slate-50 p-3 rounded-lg">
            * Estos valores son estimaciones. Las cuotas reales pueden variar según la entidad financiera, seguros obligatorios y gastos administrativos.
          </p>
        </div>
      </div>
    </div>
  );
}
