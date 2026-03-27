"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  Home, 
  Building2, 
  LandPlot, 
  Store,
  MapPin,
  Clock,
  TrendingUp,
  Sparkles,
  Send,
  User,
  Phone,
  Mail,
  Loader2
} from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export type WizardStep = {
  id: string;
  question: string;
  type: "options" | "input" | "final";
  options?: {
    id: string;
    label: string;
    icon?: React.ElementType;
    value: string;
  }[];
  fields?: {
    id: string;
    label: string;
    icon: React.ElementType;
    placeholder: string;
    type: string;
  }[];
};

interface LeadWizardProps {
  title: string;
  steps: WizardStep[];
  onComplete: (data: Record<string, any>) => void;
  onClose: () => void;
  whatsappNumber?: string;
  serviceName: string;
}

export function LeadWizard({ 
  title, 
  steps, 
  onComplete, 
  onClose, 
  whatsappNumber = "51941849523",
  serviceName 
}: LeadWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentStepData = steps[currentStep];

  const handleOptionSelect = (optionValue: string) => {
    const newData = { ...formData, [currentStepData.id]: optionValue };
    setFormData(newData);
    
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    // Basic validation for inputs
    if (currentStepData.type === "input") {
      const allFieldsFilled = currentStepData.fields?.every(f => formData[f.id]);
      if (!allFieldsFilled) return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Preparar el mensaje de WhatsApp de antemano para que esté listo independientemente del fetch
    const summary = steps
      .filter(s => s.type === "options")
      .map(s => `• ${s.question}: ${formData[s.id]}`)
      .join('\n');
    
    const contactInfo = `👤 Nombre: ${formData.name}\n📱 WhatsApp: ${formData.phone}\n📧 Email: ${formData.email}`;
    const message = `*NUEVA SOLICITUD DE ${serviceName.toUpperCase()}*\n\n${summary}\n\n*DATOS DE CONTACTO*\n${contactInfo}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Función para finalizar el proceso en el cliente
    const finishProcess = () => {
      onComplete(formData);
      setIsSubmitting(false);
      setIsCompleted(true);
      
      // Abrir WhatsApp tras un breve retraso para que el usuario vea la pantalla de éxito
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);
    };

    try {
      // 1. Intentar enviar por Email/DB via API interna
      // Añadimos un AbortController para no esperar más de 10 segundos
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const fetchPromise = fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          serviceName,
        }),
        signal: controller.signal
      });

      const response = await fetchPromise;
      clearTimeout(timeoutId);

      const result = await response.json().catch(() => ({}));
      
      if (response.ok) {
        console.log("✅ API enviada con éxito:", result);
        if (result.dbSaved) {
          console.log("💾 Guardado en DB: EXITOSO");
        } else {
          console.warn("⚠️ Guardado en DB: FALLIDO", result.dbErrorDetail);
        }
      } else {
        console.error("❌ Fallo en API:", result);
      }
    } catch (error) {
      console.error("Error submitting lead via API:", error);
      // No lanzamos el error para que el flujo de WhatsApp siga
    } finally {
      // Pase lo que pase con el API (éxito, timeout o error), 
      // pasamos a la pantalla final y abrimos WhatsApp.
      finishProcess();
    }
  };

  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-white/90 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-10 md:p-16 max-w-xl w-full text-center shadow-2xl border border-blue-50"
        >
          <div className="h-24 w-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h2 className="text-3xl font-black text-neutral-800 mb-4 tracking-tighter">¡Solicitud Enviada!</h2>
          <p className="text-neutral-500 font-medium mb-12">
            Hemos recibido tus datos correctamente. En unos segundos se abrirá WhatsApp para que podamos iniciar la atención personalizada de inmediato.
          </p>
          <Button onClick={onClose} variant="primary" size="lg" className="w-full">
            Volver a la Web
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 bg-neutral-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-slate-50 md:rounded-[3rem] w-full max-w-2xl min-h-screen md:min-h-[auto] md:max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
      >
        {/* Header */}
        <div className="p-6 md:p-10 flex items-center justify-between bg-white border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black text-[#0040FF] uppercase tracking-widest block mb-1">
              {title}
            </span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-neutral-400">Asistente Virtual Activo</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100 relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#0040FF] shadow-[0_0_15px_rgba(0,64,255,0.4)]"
          />
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl font-black text-neutral-800 leading-[1.1] tracking-tighter">
                {currentStepData.question}
              </h3>

              {currentStepData.type === "options" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentStepData.options?.map((option) => {
                    const Icon = option.icon || Home;
                    const isSelected = formData[currentStepData.id] === option.value;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.value)}
                        className={cn(
                          "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left group",
                          isSelected 
                            ? "border-[#0040FF] bg-[#0040FF]/5 text-[#0040FF]" 
                            : "border-white bg-white hover:border-slate-200 text-neutral-600 shadow-sm"
                        )}
                      >
                        <div className={cn(
                          "h-12 w-12 rounded-xl flex items-center justify-center transition-colors",
                          isSelected ? "bg-[#0040FF] text-white" : "bg-slate-50 text-neutral-400 group-hover:bg-slate-100"
                        )}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="font-bold text-sm md:text-base">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentStepData.type === "input" && (
                <div className="space-y-6">
                  {currentStepData.fields?.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2 px-1">
                        <field.icon className="h-3 w-3" />
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full bg-white border-2 border-transparent focus:border-[#0040FF] focus:bg-white p-5 rounded-2xl outline-none transition-all font-bold text-neutral-800 shadow-sm"
                      />
                    </div>
                  ))}
                  
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
                     <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#0040FF]/10 flex items-center justify-center flex-shrink-0">
                           <Sparkles className="h-5 w-5 text-[#0040FF]" />
                        </div>
                        <p className="text-xs font-bold text-blue-900 leading-relaxed">
                           Estás a un solo paso de recibir nuestra propuesta estratégica de venta líder en el mercado de Piura.
                        </p>
                     </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 md:p-10 bg-white border-t border-slate-100 flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-neutral-400 hover:text-neutral-800 disabled:opacity-0 transition-all"
          >
            <ChevronLeft className="h-4 w-4" /> Volver
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-neutral-400">
              PASO {currentStep + 1} DE {totalSteps}
            </span>
            {currentStepData.type === "input" && (
              <Button 
                onClick={handleNext} 
                disabled={isSubmitting || !currentStepData.fields?.every(f => formData[f.id])}
                size="lg"
                className="font-black px-10"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "FINALIZAR SOLICITUD"}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
