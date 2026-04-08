"use client";

import { useRouter } from "next/navigation";
import { Property } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useState } from 'react';
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Car,
  Square,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  LayoutGrid,
  Loader2,
  Home as HomeIcon,
  Mail,
  Bell,
  Clock
} from "lucide-react";

import CalculadoraHipoteca from "@/components/CalculadoraHipoteca";
import { PropertyCard } from "@/components/features/PropertyCard";
import { ScheduleVisitSection } from "@/components/features/ScheduleVisitSection";

interface PropertyClientProps {
  property: Property;
  similarProperties: Property[];
}

export default function PropertyClient({ property, similarProperties }: PropertyClientProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    docType: 'DNI',
    docNumber: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [visitType, setVisitType] = useState<'presencial' | 'videollamada'>('presencial');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitError("");
    setSubmitSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.docNumber.trim()) {
      setSubmitError("Por favor completa todos los campos del formulario.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Ingresa un correo electrónico válido.");
      return false;
    }
    return true;
  };

  const handleContactAction = async (method: 'whatsapp' | 'email') => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            document: `${formData.docType} - ${formData.docNumber}`,
            propertyId: property?.id,
            propertyTitle: property?.title,
            propertyUrl: window.location.href,
            ...(selectedDate && selectedTime ? {
              'Visita Solicitada': 'SÍ',
              'Tipo de Visita': visitType.toUpperCase(),
              'Fecha de Visita': selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
              'Hora de Visita': selectedTime
            } : {})
          },
          serviceName: selectedDate && selectedTime ? 'Reserva de Visita' : 'Contacto Web Inmueble'
        }),
      });

      if (!response.ok) {
        throw new Error("Ocurrió un error al enviar tus datos. Inténtalo de nuevo.");
      }

      if (method === 'whatsapp') {
        let baseMsg = `Hola, estoy interesado en... [${property?.title}]`;
        if (selectedDate && selectedTime) {
          baseMsg += `\n\nQuisiera agendar una visita ${visitType} para el ${selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} a las ${selectedTime}.`;
        }
        const text = encodeURIComponent(baseMsg);
        window.open(`https://wa.me/51941849523?text=${text}`, '_blank');
      } else {
        setSubmitSuccess("¡Tu mensaje ha sido enviado a la agencia de forma exitosa!");
        setFormData({ docType: 'DNI', docNumber: '', name: '', email: '', phone: '' });
      }

    } catch (err: any) {
      setSubmitError(err.message || "Error al contactar a la inmobiliaria");
    } finally {
      setIsSubmitting(false);
    }
  };

  const images = property.images && property.images.length > 0
    ? property.images
    : [property.image];

  function nextImage() {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 h-10 w-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10] sm:aspect-video">
            <Image
              src={images[currentImageIndex]}
              alt={property.title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-6 h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={nextImage} className="absolute right-6 h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10">
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-800 transition-colors font-bold text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a resultados
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-32 md:pb-40">
        {/* Galería Tipo Grid (Desktop) o Carrusel (Mobile) */}
        <div className="mb-10">
          <div
            className="hidden md:grid gap-2 rounded-2xl overflow-hidden relative aspect-[16/7]"
            style={{
              gridTemplateColumns: images.length === 1 ? '1fr' : images.length === 2 ? '1fr 1fr' : 'repeat(4, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(2, minmax(0, 1fr))'
            }}
          >
            {/* Imagen Principal */}
            {images.length > 0 && (
              <div
                className={`relative cursor-pointer group ${images.length === 1 || images.length === 2 ? 'col-span-1 row-span-2' : 'col-span-2 row-span-2'
                  }`}
                onClick={() => { setCurrentImageIndex(0); setShowGallery(true); }}
              >
                <Image src={images[0]} fill className="object-cover" alt={property.title} priority sizes={images.length === 1 ? "100vw" : "50vw"} />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300 z-10" />
              </div>
            )}

            {/* Imagen 2 (cuando son 2 fotos) */}
            {images.length === 2 && (
              <div className="col-span-1 row-span-2 relative cursor-pointer group" onClick={() => { setCurrentImageIndex(1); setShowGallery(true); }}>
                <Image src={images[1]} fill className="object-cover" alt={`${property.title} 2`} sizes="50vw" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300 z-10" />
              </div>
            )}

            {/* Cuando son 3 fotos (50% principal, 25% y 25% apiladas) */}
            {images.length === 3 && images.slice(1, 3).map((img, idx) => (
              <div key={idx} className="col-span-2 row-span-1 relative cursor-pointer group" onClick={() => { setCurrentImageIndex(idx + 1); setShowGallery(true); }}>
                <Image src={img} fill className="object-cover" alt={`${property.title} ${idx + 2}`} sizes="50vw" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300 z-10" />
              </div>
            ))}

            {/* Cuando son exactamente 4 fotos (50% principal, dos pequeñas arriba, una alargada abajo) */}
            {images.length === 4 && images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                className={`relative cursor-pointer group ${idx === 2 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'}`}
                onClick={() => { setCurrentImageIndex(idx + 1); setShowGallery(true); }}
              >
                <Image src={img} fill className="object-cover" alt={`${property.title} ${idx + 2}`} sizes={idx === 2 ? '50vw' : '25vw'} />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300 z-10" />
              </div>
            ))}

            {/* Cuando son 5 o más fotos (50% principal, 4 cuadritos a la derecha) */}
            {images.length >= 5 && images.slice(1, 5).map((img, idx) => (
              <div key={idx} className="col-span-1 row-span-1 relative cursor-pointer group" onClick={() => { setCurrentImageIndex(idx + 1); setShowGallery(true); }}>
                <Image src={img} fill className="object-cover" alt={`${property.title} ${idx + 2}`} sizes="25vw" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300 z-10" />
                {/* Overlay de '+N fotos' SOLO si hay más de 5 en total */}
                {(idx === 3 && images.length > 5) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl group-hover:bg-black/50 transition-colors z-20">
                    +{images.length - 5}
                  </div>
                )}
              </div>
            ))}

            {/* Botón flotante 'Mostrar todas las fotos' (SOLO si hay más de 5) */}
            {images.length > 5 && (
              <button
                onClick={() => setShowGallery(true)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-neutral-200 px-4 py-2 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 hover:bg-white text-neutral-800 z-30 transition-all hover:scale-105"
              >
                <LayoutGrid className="h-4 w-4" /> Mostrar todas las fotos ({images.length})
              </button>
            )}
          </div>

          {/* Versión Mobile: Carrusel nativo o Imagen Principal sola */}
          <div className="md:hidden relative rounded-2xl overflow-hidden aspect-[4/3] w-full" onClick={() => setShowGallery(true)}>
            <Image src={images[currentImageIndex]} fill className="object-cover" alt={property.title} priority />

            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider z-20">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
          {/* Thumbnails Mobile */}
          <div className="md:hidden flex gap-2 overflow-x-auto mt-3 pb-2 snap-x">
            {images.length > 1 && images.map((img, i) => (
              <button key={i} onClick={() => setCurrentImageIndex(i)} className={`shrink-0 h-16 w-24 rounded-xl overflow-hidden snap-start relative ${i === currentImageIndex ? 'ring-2 ring-[#0040FF]' : 'opacity-70'}`}>
                <Image src={img} fill className="object-cover" alt="thumb" />
              </button>
            ))}
          </div>
        </div>
        {/* Detalles Inferiores */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >

              <div className="mb-8 pb-2">
                {/* Categoría / Resumen */}
                <p className="text-neutral-500 font-medium text-[14px] mb-3">
                  {[
                    property.propertyType,
                    property.subType,
                    (property.area && property.area !== "0 m²") ? property.area : undefined,
                    property.beds > 0 ? `${property.beds} dormitorio${property.beds !== 1 ? 's' : ''}` : undefined,
                  ]
                    .filter(Boolean)
                    .map((item) => (item as string).charAt(0).toUpperCase() + (item as string).slice(1))
                    .join(' · ')}
                </p>

                {/* Título Principal */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-neutral-800 leading-tight mb-3">
                  {property.title}
                </h1>

                {/* Ubicación y Ver mapa */}
                <div className="flex flex-wrap items-center gap-2 text-neutral-600 font-medium text-[15px] mb-5">
                  <span>{property.address || property.location}</span>
                  <span className="text-neutral-300">|</span>
                  <button className="flex items-center gap-1 text-[#0040FF] hover:underline">
                    <MapPin className="h-4 w-4" />
                    Ver mapa
                  </button>
                </div>

                {/* Bloque de Precios (Mantenido con sus badges) */}
                <div className="flex flex-wrap items-end gap-x-2 gap-y-4 mb-4">
                  {/* Precio Soles */}
                  <div className="flex flex-col items-start gap-1">
                    <span className="bg-[#0040FF]/10 text-[#0040FF] font-black text-[9px] uppercase tracking-widest px-2 py-1 rounded leading-none">Precio Soles</span>
                    <h2 className="text-2xl md:text-3xl font-black text-neutral-900 leading-none">
                      {property.price.replace('/mes', '')}
                    </h2>
                  </div>

                  {/* Precio Dólares */}
                  {property.priceUsd && (
                    <>
                      <h2 className="text-2xl md:text-3xl font-black text-neutral-300 leading-none">
                        -
                      </h2>
                      <div className="flex flex-col items-start gap-1">
                        <span className="bg-green-600/10 text-green-700 font-black text-[9px] uppercase tracking-widest px-2 py-1 rounded leading-none">Precio Dólares</span>
                        <h2 className="text-2xl md:text-3xl font-black text-neutral-900 leading-none">
                          {property.priceUsd}
                        </h2>
                      </div>
                    </>
                  )}
                </div>

                {property.maintenance && (
                  <p className="text-neutral-600 font-medium text-[15px] mb-6">
                    Mantenimiento {property.maintenance}
                  </p>
                )}

                {/* Acciones */}
                <div className="flex items-center gap-6 mt-6">
                  <button className="flex items-center gap-2 text-[15px] font-bold text-[#0040FF] hover:underline underline-offset-4">
                    <Share2 className="h-4 w-4" /> Compartir
                  </button>
                  <button className="flex items-center gap-2 text-[15px] font-bold text-[#0040FF] hover:underline underline-offset-4">
                    <Heart className="h-4 w-4" /> Guardar
                  </button>
                </div>
              </div>

              {/* Resumen */}
              <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-800 mb-6">Resumen</h3>
                <div className="py-6 border-t border-b border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
                  {!!property.beds && String(property.beds) !== '0' && (
                    <div className="flex items-center gap-4">
                      <BedDouble className="h-7 w-7 text-[#465F76] stroke-[1.5]" />
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-neutral-900 leading-tight">{property.beds}</span>
                        <span className="text-[12px] text-neutral-500">{property.beds === 1 ? 'Habitación' : 'Habitaciones'}</span>
                      </div>
                    </div>
                  )}
                  {!!property.baths && String(property.baths) !== '0' && (
                    <div className="flex items-center gap-4">
                      <Bath className="h-7 w-7 text-[#465F76] stroke-[1.5]" />
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-neutral-900 leading-tight">{property.baths}</span>
                        <span className="text-[12px] text-neutral-500">{property.baths === 1 ? 'Baño' : 'Baños'}</span>
                      </div>
                    </div>
                  )}
                  {!!property.garage && String(property.garage) !== '0' && (
                    <div className="flex items-center gap-4">
                      <Car className="h-7 w-7 text-[#465F76] stroke-[1.5]" />
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-neutral-900 leading-tight">{property.garage}</span>
                        <span className="text-[12px] text-neutral-500">{property.garage === 1 ? 'Cochera' : 'Cocheras'}</span>
                      </div>
                    </div>
                  )}
                  {!!property.area && String(property.area) !== '0' && !String(property.area).startsWith('0 ') && (
                    <div className="flex items-center gap-4">
                      <Square className="h-7 w-7 text-[#465F76] stroke-[1.5]" />
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-neutral-900 leading-tight">{property.area}</span>
                        <span className="text-[12px] text-neutral-500">Área de Terreno</span>
                      </div>
                    </div>
                  )}
                  {!!property.age && (
                    <div className="flex items-center gap-4">
                      <Clock className="h-7 w-7 text-[#465F76] stroke-[1.5]" />
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-neutral-900 leading-tight">{property.age} años</span>
                        <span className="text-[12px] text-neutral-500">Antigüedad</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="mt-8">
                  <h3 className="text-xl font-black text-neutral-800 mb-4">Descripción</h3>
                  <p className="text-neutral-600 font-medium text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="text-xl font-black text-neutral-800 mb-6">Características y Amenidades</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#0040FF] shrink-0 opacity-80" />
                        <span className="text-[15px] font-medium text-neutral-700 leading-tight">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Calculadora de Hipoteca */}
              {property.type === 'Venta' && (
                <CalculadoraHipoteca 
                  priceSoles={property.priceAmount}
                  priceDollars={property.priceAltAmount || 0}
                  initialCurrency={property.price.includes('$') ? 'USD' : 'PEN'}
                />
              )}

              {/* Agendar Visita - Rediseñado */}
              <div className="mt-12 pt-10 border-t border-slate-200">
                <ScheduleVisitSection 
                  onSchedule={(date, time) => {
                    setSelectedDate(date);
                    setSelectedTime(time);
                    handleContactAction('whatsapp');
                  }}
                />
              </div>

              {/* Propiedades Similares */}
              {similarProperties.length > 0 && (
                <div className="mt-24 pt-10 border-t border-slate-200">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 bg-[#0040FF]/10 rounded-xl flex items-center justify-center text-[#0040FF]">
                      <HomeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-neutral-800">Propiedades similares</h3>
                      <p className="text-sm text-neutral-500 font-medium tracking-tight">Otras opciones en {property.city || 'la zona'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {similarProperties.map((prop) => (
                      <div key={prop.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                        <PropertyCard property={prop} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 text-center">
                    <button 
                      onClick={() => router.push('/propiedades')}
                      className="px-8 py-3 bg-white border border-slate-200 text-neutral-800 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all shadow-sm"
                    >
                      Ver todas las propiedades
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Price & Contact */}
          <div className="relative h-full">
            <div className="sticky top-28 space-y-6">
            {/* Formulario / Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-6 lg:p-8 shadow-md border border-slate-100 shadow-sm"
              >

                {/* Agent Info Dinámico */}
                <div className="flex items-center gap-4 mb-8">
                  {(() => {
                    const agencyName = property?.agent?.agency?.trim();
                    const isCasaty = !agencyName || agencyName.toLowerCase().includes('casaty');
                    
                    const displayName = isCasaty 
                      ? (property?.agent?.name || 'Agente de Casaty') 
                      : agencyName; // Si no es Casaty, muestra solo la inmobiliaria

                    const displayImage = property?.agent?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'Casaty')}&background=223345&color=fff`;

                    return (
                      <>
                        <div 
                          className="relative h-16 w-16 rounded-full overflow-hidden shrink-0 shadow-sm bg-cover bg-center border border-slate-100" 
                          style={{ backgroundImage: `url('${displayImage}')` }} 
                        />
                        <div className="flex flex-col">
                          <span className="text-[17px] font-bold text-neutral-800 tracking-tight leading-snug">
                            {displayName}
                          </span>
                          {isCasaty && (
                            <span className="text-[14px] text-neutral-500 font-medium">
                              {agencyName || 'Casaty'}
                            </span>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Formulario */}
                <div className="space-y-4 mb-6">
                  
                  {/* DNI & Document */}
                  <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#0050B3] focus-within:ring-1 focus-within:ring-[#0050B3] transition-all">
                    <select 
                      name="docType"
                      value={formData.docType}
                      onChange={handleInputChange}
                      className="w-24 px-3 py-3.5 bg-transparent text-[15px] font-medium text-neutral-700 outline-none border-r border-slate-200 cursor-pointer appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
                    >
                      <option value="DNI">DNI</option>
                      <option value="CE">CE</option>
                      <option value="Pasaporte">PAS</option>
                    </select>
                    <input 
                      name="docNumber"
                      value={formData.docNumber}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="Documento" 
                      className="w-full px-4 py-3.5 bg-transparent text-[15px] text-neutral-800 placeholder:text-neutral-400 outline-none" 
                    />
                  </div>

                  {/* Name */}
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="Nombre completo" 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-[15px] focus:outline-none focus:border-[#0050B3] focus:ring-1 focus:ring-[#0050B3] text-neutral-800 placeholder:text-neutral-400 transition-all" 
                  />

                  {/* Email */}
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    placeholder="Correo electrónico" 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-[15px] focus:outline-none focus:border-[#0050B3] focus:ring-1 focus:ring-[#0050B3] text-neutral-800 placeholder:text-neutral-400 transition-all" 
                  />

                  {/* Phone */}
                  <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#0050B3] focus-within:ring-1 focus-within:ring-[#0050B3] transition-all">
                    <div className="w-24 px-3 py-3.5 bg-transparent flex items-center gap-2 border-r border-slate-200">
                      <img src="https://flagcdn.com/w20/pe.png" alt="Peru flag" className="w-5 h-[15px] object-cover rounded-sm" />
                      <span className="text-[14px] text-neutral-500 font-medium">+51</span>
                    </div>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel" 
                      placeholder="Teléfono" 
                      className="w-full px-4 py-3.5 bg-transparent text-[15px] text-neutral-800 placeholder:text-neutral-400 outline-none" 
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-[13px] font-medium">
                    {submitError}
                  </div>
                )}
                {submitSuccess && (
                  <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-[13px] font-medium">
                    {submitSuccess}
                  </div>
                )}

                {/* Botones */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleContactAction('whatsapp')}
                    disabled={isSubmitting}
                    className="w-full bg-[#0055B8] hover:bg-[#00408A] text-white py-3.5 rounded-[14px] font-bold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSubmitting ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <MessageCircle className="h-[18px] w-[18px] stroke-[2.5]" />}
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => handleContactAction('email')}
                    disabled={isSubmitting}
                    className="w-full bg-[#0055B8] hover:bg-[#00408A] text-white py-3.5 rounded-[14px] font-bold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSubmitting ? <Loader2 className="w-[18px] h-[18px] animate-spin" /> : <Mail className="h-[18px] w-[18px] stroke-[2.5]" />}
                    Correo
                  </button>
                </div>

              </motion.div>

              <div className="px-1 text-center">
                <p className="text-[12px] text-neutral-500 font-medium leading-relaxed mb-6">
                  Al hacer clic en "WhatsApp" o "Correo" estás aceptando nuestros <a href="/terminos-y-condiciones" className="text-neutral-700 hover:text-[#0055B8] transition-colors">Términos y condiciones</a> y Políticas de privacidad.
                </p>

                <button className="w-full border border-[#0055B8] text-[#0055B8] hover:bg-[#0055B8]/5 py-3.5 rounded-[14px] font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm bg-white">
                  <Bell className="h-4 w-4 stroke-[2.5]" />
                  Recibe alertas de inmuebles similares
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
