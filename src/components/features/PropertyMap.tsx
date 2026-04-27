'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { Property } from '@/lib/types';

interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
  selectedProperty?: Property | null;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Estilo minimalista (Silver)
const silverMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }
];

/**
 * Formatea un precio de forma compacta (ej: 155,000 -> 155K)
 */
function formatCompactPrice(priceStr: string): string {
  const symbol = priceStr.includes('$') ? '$' : 'S/';
  const numericValue = parseInt(priceStr.replace(/[^0-9]/g, ''));
  
  if (isNaN(numericValue)) return priceStr.split('/')[0];

  if (numericValue >= 1000000) {
    return `${symbol}${(numericValue / 1000000).toFixed(1)}M`;
  }
  if (numericValue >= 1000) {
    return `${symbol}${(numericValue / 1000).toFixed(0)}K`;
  }
  return `${symbol}${numericValue}`;
}

export function PropertyMap({ properties, onPropertyClick, selectedProperty }: PropertyMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hasFitBounds, setHasFitBounds] = useState(false);

  const center = useMemo(() => ({
    lat: -5.1945,
    lng: -80.6328
  }), []);

  // Filtrar propiedades con coordenadas válidas
  const geocodedProperties = useMemo(() => {
    return properties.filter(p => p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng));
  }, [properties]);

  // Zoom inteligente: Ajustar límites del mapa
  React.useEffect(() => {
    if (map && geocodedProperties.length > 0 && !hasFitBounds) {
      const bounds = new google.maps.LatLngBounds();
      geocodedProperties.forEach(p => bounds.extend({ lat: p.lat!, lng: p.lng! }));
      
      // Añadimos padding izquierdo si estamos en desktop para compensar el sidebar (380px + margen)
      const isDesktop = window.innerWidth >= 768;
      map.fitBounds(bounds, {
        top: 80,
        right: 80,
        bottom: 80,
        left: isDesktop ? 450 : 80
      });
      setHasFitBounds(true);
    }
  }, [map, geocodedProperties, hasFitBounds]);

  // Resetear flag si cambian drasticamente las propiedades
  React.useEffect(() => {
    setHasFitBounds(false);
  }, [properties.length]);

  if (!isLoaded) return (
    <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 font-bold uppercase tracking-tighter text-xs">
      Cargando Mapa...
    </div>
  );

  return (
    <div className="w-full h-full relative group/map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedProperty ? { lat: selectedProperty.lat!, lng: selectedProperty.lng! } : center}
        zoom={selectedProperty ? 16 : 14}
        onLoad={setMap}
        options={{
          styles: silverMapStyle,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          maxZoom: 16,
          minZoom: 5,
        }}
      >
        {geocodedProperties.map((p) => (
          <OverlayView
            key={p.id}
            position={{ lat: p.lat!, lng: p.lng! }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({ 
              x: -(width / 2), 
              y: -height 
            })}
          >
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              onClick={() => onPropertyClick && onPropertyClick(p)}
              className="flex flex-col items-center gap-0.5 cursor-pointer group"
              style={{ zIndex: selectedProperty?.id === p.id ? 100 : 1 }}
            >
              {/* Precio Compacto */}
              <div className={`px-2 py-1 rounded-md shadow-lg border-[1.5px] border-white transition-all duration-300
                ${selectedProperty?.id === p.id
                  ? 'bg-[#0127AC] text-white scale-110' 
                  : 'bg-[#0127AC] text-white'
                }`}
              >
                <span className="text-[10px] font-black tracking-tight whitespace-nowrap">
                  {formatCompactPrice(p.price)}
                </span>
              </div>

              {/* Punto de Ubicación (Dot) */}
              <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-all duration-300
                ${selectedProperty?.id === p.id
                  ? 'bg-[#0127AC] scale-125' 
                  : 'bg-[#0127AC]'
                }`} 
              />
            </motion.div>
          </OverlayView>
        ))}
      </GoogleMap>
    </div>
  );
}
