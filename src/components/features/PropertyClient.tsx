"use client";

import { useRouter } from "next/navigation";
import { Property } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useState, lazy, Suspense } from 'react';
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
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  LayoutGrid,
  Loader2,
  Home as HomeIcon,
  Bell,
  Clock,
  ClipboardList,
  FileText
} from "lucide-react";

import CalculadoraHipoteca from "@/components/CalculadoraHipoteca";
import { PropertyCard } from "@/components/features/PropertyCard";
import { ScheduleVisitSection } from "@/components/features/ScheduleVisitSection";
import PropertyAlertModal from "./PropertyAlertModal";
import dynamic from 'next/dynamic';

// Lazy load del mapa de ubicación para rendimiento
const PropertyLocationMap = dynamic(() => import('@/components/features/PropertyLocationMap'), {
  ssr: false,
  loading: () => (
    <div className="mt-10 pt-8 border-t border-slate-100">
      <div className="w-full h-[350px] bg-slate-100 animate-pulse rounded-xl" />
    </div>
  ),
});

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
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // Extraer información del agente para reutilizar
  const agencyName = property?.agent?.agency?.trim();
  const isCasaty = !agencyName || agencyName.toLowerCase().includes('casaty');
  const agentDisplayName = isCasaty ? (property?.agent?.name || 'Luis Cardoza') : agencyName;
  
  // Lógica de Imagen: Si es externo, mostramos el logo de Casaty (branding del portal)
  // Si es interno, mostramos su foto. Si no tiene foto, usamos el logo de Casaty como respaldo profesional.
  const agentDisplayImage = isCasaty 
    ? (property?.agent?.photo || property?.agent?.agencyLogo || '/Logo/logo-dark.webp')
    : (property?.agent?.agencyLogo || '/Logo/logo-dark.webp');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitError("");
    setSubmitSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
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
        setFormData({ name: '', email: '', phone: '' });
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
          onClick={() => router.push('/propiedades')}
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
            className="hidden md:grid gap-2 rounded-xl overflow-hidden relative aspect-[16/7]"
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
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-neutral-200 px-4 py-2 rounded-lg font-bold text-sm shadow-md flex items-center gap-2 hover:bg-white text-neutral-800 z-30 transition-all hover:scale-105"
              >
                <LayoutGrid className="h-4 w-4" /> Mostrar todas las fotos ({images.length})
              </button>
            )}
          </div>

          {/* Versión Mobile: Carrusel nativo o Imagen Principal sola */}
          <div className="md:hidden relative rounded-xl overflow-hidden aspect-[4/3] w-full" onClick={() => setShowGallery(true)}>
            <Image src={images[currentImageIndex]} fill className="object-cover" alt={property.title} priority />

            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-bold tracking-wider z-20">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
          {/* Thumbnails Mobile */}
          <div className="md:hidden flex gap-2 overflow-x-auto mt-3 pb-2 snap-x">
            {images.length > 1 && images.map((img, i) => (
              <button key={i} onClick={() => setCurrentImageIndex(i)} className={`shrink-0 h-16 w-24 rounded-lg overflow-hidden snap-start relative ${i === currentImageIndex ? 'ring-2 ring-[#0127AC]' : 'opacity-70'}`}>
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
                  <button className="flex items-center gap-1 text-[#0127AC] hover:underline">
                    <MapPin className="h-4 w-4" />
                    Ver mapa
                  </button>
                </div>

                {/* Bloque de Precios (Mantenido con sus badges) */}
                <div className="flex flex-wrap items-end gap-x-2 gap-y-4 mb-4">
                  {/* Precio Soles */}
                  <div className="flex flex-col items-start gap-1">
                    <span className="bg-[#0127AC]/10 text-[#0127AC] font-black text-[9px] uppercase tracking-widest px-2 py-1 rounded leading-none">Precio Soles</span>
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
                  <button className="flex items-center gap-2 text-[15px] font-bold text-[#0127AC] hover:underline underline-offset-4">
                    <Share2 className="h-4 w-4" /> Compartir
                  </button>
                  <button className="flex items-center gap-2 text-[15px] font-bold text-[#0127AC] hover:underline underline-offset-4">
                    <Heart className="h-4 w-4" /> Guardar
                  </button>
                </div>
              </div>

              {/* Resumen */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 bg-[#0127AC]/10 rounded-lg flex items-center justify-center text-[#0127AC]">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-neutral-800">Resumen</h3>
                    <p className="text-sm text-neutral-500 font-medium tracking-tight">Características principales del inmueble</p>
                  </div>
                </div>
                <div className="py-6 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
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
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 bg-[#0127AC]/10 rounded-lg flex items-center justify-center text-[#0127AC]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-neutral-800">Descripción</h3>
                      <p className="text-sm text-neutral-500 font-medium tracking-tight">Detalles completos de la propiedad</p>
                    </div>
                  </div>
                  <p className="text-neutral-600 font-medium text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              )}

              {/* Mapa de Ubicación + Lugares Cercanos */}
              {property.lat && property.lng && (
                <PropertyLocationMap
                  lat={property.lat}
                  lng={property.lng}
                  address={property.address || property.location}
                  propertyTitle={property.title}
                />
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="text-xl font-black text-neutral-800 mb-6">Características y Amenidades</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#0127AC] shrink-0 opacity-80" />
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
                    <div className="h-10 w-10 bg-[#0127AC]/10 rounded-lg flex items-center justify-center text-[#0127AC]">
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
                      className="px-8 py-3 bg-white border border-slate-200 text-neutral-800 rounded-lg font-black text-sm hover:bg-slate-50 transition-all shadow-sm"
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
                id="contact-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100"
              >
                {/* Agent Info Estilo Mockup */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                    <Image src={agentDisplayImage} fill className="object-cover" alt={agentDisplayName} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[17px] font-bold text-neutral-800 tracking-tight leading-tight">
                      {agentDisplayName}
                    </span>
                    <span className="text-[13px] text-neutral-500 font-medium mt-1">
                      {property?.agent?.position || (isCasaty ? 'Broker de Inmobiliaria Casaty' : agencyName)}
                    </span>
                    {property?.agent?.mvcs && (
                      <span className="text-[13px] text-neutral-500 font-medium">
                        Codigo MVCS: {property.agent.mvcs}
                      </span>
                    )}
                  </div>
                </div>

                {/* Formulario Estilo Mockup */}
                <div className="space-y-3">
                  {/* Name */}
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="Nombre completo" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-100 text-[15px] focus:outline-none focus:border-neutral-300 text-neutral-800 placeholder:text-neutral-400 transition-all bg-white"
                  />

                  {/* Email */}
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    placeholder="Correo electrónico" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-100 text-[15px] focus:outline-none focus:border-neutral-300 text-neutral-800 placeholder:text-neutral-400 transition-all bg-white" 
                  />

                  {/* Phone */}
                  <div className="flex bg-white border border-slate-100 rounded-lg overflow-hidden focus-within:border-neutral-300 transition-all">
                    <div className="w-24 px-3 py-3 bg-transparent flex items-center justify-center gap-2 border-r border-slate-50">
                      <span className="text-[14px] text-neutral-500 font-bold">PE +51</span>
                    </div>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel" 
                      placeholder="Teléfono" 
                      className="w-full px-4 py-3 bg-transparent text-[15px] text-neutral-800 placeholder:text-neutral-400 outline-none" 
                    />
                  </div>


                  {/* Mensaje Textarea */}
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-slate-100 text-[15px] focus:outline-none focus:border-neutral-300 text-neutral-800 placeholder:text-neutral-400 transition-all bg-[#F9F9F9] resize-none"
                    placeholder="¡Hola! Me interesa esta propiedad..."
                    defaultValue="¡Hola! Me interesa esta propiedad y me gustaría recibir más información."
                  />
                </div>

                {submitError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-[13px] font-medium text-center">
                    {submitError}
                  </div>
                )}

                {/* Botón Principal WhatsApp Verde Mockup */}
                <motion.button 
                  whileHover={{ backgroundColor: '#00B86B', scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleContactAction('whatsapp')}
                  disabled={isSubmitting}
                  style={{ backgroundColor: '#00D179' }}
                  className="w-full mt-3 text-white py-3.5 rounded-lg font-bold text-[16px] transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-green-500/10"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-5 h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Iniciar conversación
                      </>
                    )}
                </motion.button>


              </motion.div>

              <div className="px-1 text-center">
                <p className="text-[11px] text-neutral-400 font-medium leading-relaxed mb-6">
                  Al hacer clic en "Iniciar conversación" estás aceptando nuestros <a href="/terminos-y-condiciones" className="text-neutral-500 hover:text-[#0055B8] transition-colors underline">Términos y condiciones</a> y Políticas de privacidad.
                </p>

                <button 
                  onClick={() => setIsAlertModalOpen(true)}
                  className="w-full border border-[#0127AC] text-[#0127AC] hover:bg-[#0127AC]/5 py-3.5 rounded-lg font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm bg-white"
                >
                  <Bell className="h-4 w-4 stroke-[2.5]" />
                  Recibe alertas de inmuebles similares
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <PropertyAlertModal 
        isOpen={isAlertModalOpen} 
        onClose={() => setIsAlertModalOpen(false)}
        initialCity={property?.address?.split(',').reverse()[1]?.trim() || property?.address?.split(',').pop()?.trim() || ""}
        initialType={property?.type}
      />

      {/* Sticky Bottom Bar for Mobile */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.08)] p-4 z-40 border-t border-slate-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 shadow-sm">
            <Image src={agentDisplayImage} fill className="object-cover" alt={agentDisplayName} />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-extrabold text-neutral-800 line-clamp-1 leading-tight">{agentDisplayName}</span>
            <span className="text-[11px] text-[#00D179] font-bold">En línea ahora</span>
          </div>
        </div>
        <button 
          onClick={() => {
            document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          style={{ backgroundColor: '#00D179' }}
          className="text-white px-5 py-3 rounded-lg font-bold text-[13px] flex items-center gap-2 shadow-lg shadow-green-500/10 active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Más información
        </button>
      </motion.div>
    </main>
  );
}


