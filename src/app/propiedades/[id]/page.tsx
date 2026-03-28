"use client";

import { useParams, useRouter } from "next/navigation";
import { getProperties, Property } from "@/lib/data";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
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
  X
} from "lucide-react";

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
          <button onClick={prevImage} className="absolute left-6 h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={images[currentImageIndex]}
            alt={property.title}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
          />
          <button onClick={nextImage} className="absolute right-6 h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ChevronRight className="h-6 w-6" />
          </button>
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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden bg-neutral-100 aspect-[16/10] cursor-pointer group"
              onClick={() => setShowGallery(true)}
            >
              <img
                src={images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Labels */}
              <div className="absolute top-6 left-6 flex gap-2">
                {property.propertyType && (
                  <span className="bg-neutral-800/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {property.propertyType}
                  </span>
                )}
                <span className="bg-[#0040FF] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                  {property.type === 'Venta' ? 'VENTA' : 'ALQUILER'}
                </span>
              </div>

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 rounded-full flex items-center justify-center text-neutral-800 shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 rounded-full flex items-center justify-center text-neutral-800 shadow-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`shrink-0 h-16 w-24 rounded-xl overflow-hidden border-2 transition-all ${
                      i === currentImageIndex ? 'border-[#0040FF] shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Property Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
            >
              <h1 className="text-2xl md:text-3xl font-black text-neutral-800 mb-4 leading-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-neutral-500 font-medium text-sm mb-6">
                <MapPin className="h-4 w-4 text-[#0040FF]" />
                <span>{property.address || property.location}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 py-6 border-y border-slate-100">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BedDouble className="h-5 w-5 text-[#0040FF]" />
                  </div>
                  <span className="text-sm font-black text-neutral-800">{property.beds}</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Hab.</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Bath className="h-5 w-5 text-[#0040FF]" />
                  </div>
                  <span className="text-sm font-black text-neutral-800">{property.baths}</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Baños</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Car className="h-5 w-5 text-[#0040FF]" />
                  </div>
                  <span className="text-sm font-black text-neutral-800">{property.garage}</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Cochera</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Square className="h-5 w-5 text-[#0040FF]" />
                  </div>
                  <span className="text-sm font-black text-neutral-800">{property.area}</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Área</span>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="mt-6">
                  <h3 className="text-lg font-black text-neutral-800 mb-3">Descripción</h3>
                  <p className="text-neutral-600 font-medium text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
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

              {/* Action Buttons */}
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

              {/* Share & Favorite */}
              <div className="flex gap-3 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-neutral-600 hover:bg-slate-50 transition-colors text-sm font-bold">
                  <Heart className="h-4 w-4" />
                  Guardar
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-neutral-600 hover:bg-slate-50 transition-colors text-sm font-bold">
                  <Share2 className="h-4 w-4" />
                  Compartir
                </button>
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
