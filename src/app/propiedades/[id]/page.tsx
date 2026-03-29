"use client";

import { useParams, useRouter } from "next/navigation";
import { getProperties, Property } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from 'react';
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
  LayoutGrid
} from "lucide-react";

import CalculadoraHipoteca from "@/components/CalculadoraHipoteca";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const allProps = await getProperties();
        const found = allProps.find(p => p.id === propertyId);
        setProperty(found || null);
      } catch (error) {
        console.error("Error loading property:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [propertyId]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-[#0040FF] border-t-transparent rounded-full mx-auto mb-4"></div>
          <span className="text-neutral-400 font-black">Cargando propiedad...</span>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-black text-neutral-800 mb-4">Propiedad no encontrada</h2>
          <p className="text-neutral-500 font-medium mb-6">La propiedad que buscas no existe o fue eliminada.</p>
          <button
            onClick={() => router.push('/propiedades')}
            className="px-6 py-2.5 bg-[#0040FF] text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors"
          >
            Ver todas las propiedades
          </button>
        </div>
      </main>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.image];

  function nextImage() {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en la propiedad: ${property.title} (${property.price}). ¿Pueden darme más información?`
  );

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
                className={`relative cursor-pointer group ${
                  images.length === 1 || images.length === 2 ? 'col-span-1 row-span-2' : 'col-span-2 row-span-2'
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
                <Image src={img} fill className="object-cover" alt={`${property.title} ${idx+2}`} sizes="50vw" />
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
                <Image src={img} fill className="object-cover" alt={`${property.title} ${idx+2}`} sizes={idx === 2 ? '50vw' : '25vw'} />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300 z-10" />
              </div>
            ))}

            {/* Cuando son 5 o más fotos (50% principal, 4 cuadritos a la derecha) */}
            {images.length >= 5 && images.slice(1, 5).map((img, idx) => (
              <div key={idx} className="col-span-1 row-span-1 relative cursor-pointer group" onClick={() => { setCurrentImageIndex(idx + 1); setShowGallery(true); }}>
                <Image src={img} fill className="object-cover" alt={`${property.title} ${idx+2}`} sizes="25vw" />
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
                    .map((item) => (typeof item === 'string' ? item.charAt(0).toUpperCase() + item.slice(1) : item))
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

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-start gap-x-10 md:gap-x-16 gap-y-6 py-8 border-y border-slate-200 w-full mb-8">
                {!!property.beds && String(property.beds) !== '0' && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <BedDouble className="h-5 w-5 text-[#0040FF]" />
                    </div>
                    <span className="text-sm font-black text-neutral-800">{property.beds}</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Hab.</span>
                  </div>
                )}
                {!!property.baths && String(property.baths) !== '0' && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Bath className="h-5 w-5 text-[#0040FF]" />
                    </div>
                    <span className="text-sm font-black text-neutral-800">{property.baths}</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Baños</span>
                  </div>
                )}
                {!!property.garage && String(property.garage) !== '0' && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Car className="h-5 w-5 text-[#0040FF]" />
                    </div>
                    <span className="text-sm font-black text-neutral-800">{property.garage}</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Cochera</span>
                  </div>
                )}
                {!!property.area && String(property.area) !== '0' && !String(property.area).startsWith('0 ') && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Square className="h-5 w-5 text-[#0040FF]" />
                    </div>
                    <span className="text-sm font-black text-neutral-800">{property.area}</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Área</span>
                  </div>
                )}
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
                  priceRaw={property.price}
                  currencySymbol={property.price.includes('$') ? '$' : 'S/'}
                />
              )}
            </motion.div>
          </div>

          {/* Right Column - Price & Contact */}
          <div className="space-y-6">
            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-28"
            >
              <div className="mb-6">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Precio de Inversión</p>
                <h2 className="text-3xl font-black text-[#0040FF] leading-none">
                  {property.price}
                </h2>
                {property.priceUsd && (
                  <p className="text-sm font-bold text-neutral-400 mt-1">
                    / {property.priceUsd}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/51941849523?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-green-500/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
                <a
                  href="tel:+51941849523"
                  className="w-full flex items-center justify-center gap-2 bg-[#0040FF] hover:bg-blue-700 text-white py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20"
                >
                  <Phone className="h-5 w-5" />
                  Llamar ahora
                </a>
              </div>

              {/* Agent Info */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#0040FF] flex items-center justify-center text-white font-black text-lg">
                    C
                  </div>
                  <div>
                    <p className="font-black text-neutral-800 text-sm">Casaty Inmobiliaria</p>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Agente Verificado</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
