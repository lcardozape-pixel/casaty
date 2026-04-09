'use client';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  GraduationCap,
  ShoppingCart,
  Stethoscope,
  Utensils,
  Bus,
  Trees,
  Landmark,
  Dumbbell,
  Fuel,
  ChevronDown,
  ChevronUp,
  Navigation,
  Clock,
} from 'lucide-react';

// Librería que necesitamos cargar
const libraries: ("places")[] = ['places'];

interface PropertyLocationMapProps {
  lat: number;
  lng: number;
  address?: string;
  propertyTitle?: string;
}

// Estilo minimalista (Silver) - Consistente con PropertyMap
const silverMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "on" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }
];

interface NearbyPlace {
  name: string;
  type: string;
  category: string;
  distance: number; // metros
  walkTime: number; // minutos caminando
  lat: number;
  lng: number;
  rating?: number;
  icon: React.ReactNode;
}

// Categorías de lugares cercanos con iconos
const placeCategories = [
  { type: 'school', label: 'Educación', icon: <GraduationCap className="h-4 w-4" />, color: '#4F46E5' },
  { type: 'supermarket', label: 'Supermercados', icon: <ShoppingCart className="h-4 w-4" />, color: '#059669' },
  { type: 'hospital', label: 'Salud', icon: <Stethoscope className="h-4 w-4" />, color: '#DC2626' },
  { type: 'restaurant', label: 'Restaurantes', icon: <Utensils className="h-4 w-4" />, color: '#EA580C' },
  { type: 'transit_station', label: 'Transporte', icon: <Bus className="h-4 w-4" />, color: '#7C3AED' },
  { type: 'park', label: 'Parques', icon: <Trees className="h-4 w-4" />, color: '#16A34A' },
  { type: 'bank', label: 'Bancos', icon: <Landmark className="h-4 w-4" />, color: '#0369A1' },
  { type: 'gym', label: 'Gimnasios', icon: <Dumbbell className="h-4 w-4" />, color: '#BE185D' },
  { type: 'gas_station', label: 'Grifos', icon: <Fuel className="h-4 w-4" />, color: '#CA8A04' },
];

/**
 * Calcula la distancia en metros entre dos coordenadas usando la fórmula de Haversine
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Formatea la distancia en metros o kilómetros
 */
function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export default function PropertyLocationMap({ lat, lng, address, propertyTitle }: PropertyLocationMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const serviceRef = useRef<google.maps.places.PlacesService | null>(null);

  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  // Buscar lugares cercanos cuando el mapa esté listo
  useEffect(() => {
    if (!map || !isLoaded) return;

    serviceRef.current = new google.maps.places.PlacesService(map);
    
    const allPlaces: NearbyPlace[] = [];
    let completedRequests = 0;
    const totalRequests = placeCategories.length;

    placeCategories.forEach((category) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location: new google.maps.LatLng(lat, lng),
        radius: 1500, // 1.5 km de radio
        type: category.type,
      };

      serviceRef.current!.nearbySearch(request, (results, status) => {
        completedRequests++;

        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const filteredResults = results.slice(0, 3); // Máximo 3 por categoría
          filteredResults.forEach((place) => {
            if (place.geometry?.location) {
              const placeLat = place.geometry.location.lat();
              const placeLng = place.geometry.location.lng();
              const distance = calculateDistance(lat, lng, placeLat, placeLng);
              const walkTime = Math.ceil(distance / 80); // ~80m/min caminando

              allPlaces.push({
                name: place.name || 'Sin nombre',
                type: category.type,
                category: category.label,
                distance,
                walkTime,
                lat: placeLat,
                lng: placeLng,
                rating: place.rating,
                icon: category.icon,
              });
            }
          });
        }

        if (completedRequests === totalRequests) {
          // Ordenar por distancia
          allPlaces.sort((a, b) => a.distance - b.distance);
          setNearbyPlaces(allPlaces);
          setLoadingPlaces(false);
        }
      });
    });
  }, [map, isLoaded, lat, lng]);

  // Agrupar lugares por categoría
  const groupedPlaces = useMemo(() => {
    const groups: Record<string, NearbyPlace[]> = {};
    nearbyPlaces.forEach((place) => {
      if (!groups[place.category]) {
        groups[place.category] = [];
      }
      groups[place.category].push(place);
    });
    return groups;
  }, [nearbyPlaces]);

  // Filtrar los lugares visibles
  const visiblePlaces = useMemo(() => {
    if (activeCategory) {
      return nearbyPlaces.filter((p) => p.category === activeCategory);
    }
    return showAllPlaces ? nearbyPlaces : nearbyPlaces.slice(0, 8);
  }, [nearbyPlaces, activeCategory, showAllPlaces]);

  // Obtener el color de la categoría
  const getCategoryColor = (categoryLabel: string): string => {
    return placeCategories.find((c) => c.label === categoryLabel)?.color || '#6B7280';
  };

  if (!isLoaded) {
    return (
      <div className="mt-10 pt-8 border-t border-slate-100">
        <h3 className="text-xl font-black text-neutral-800 mb-6">Ubicación</h3>
        <div className="w-full h-[350px] bg-slate-100 animate-pulse rounded-xl flex items-center justify-center">
          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">
            Cargando Mapa...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════ */}
      {/* SECCIÓN: Mapa de Ubicación                        */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="mt-10 pt-8 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-[#0127AC]/10 rounded-lg flex items-center justify-center text-[#0127AC]">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-neutral-800">Ubicación</h3>
            {address && (
              <p className="text-sm text-neutral-500 font-medium tracking-tight">{address}</p>
            )}
          </div>
        </div>

        {/* Mapa */}
        <div className="w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-sm border border-slate-100 relative">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={16}
            onLoad={setMap}
            options={{
              styles: silverMapStyle,
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: true,
              fullscreenControl: true,
              maxZoom: 19,
              minZoom: 12,
            }}
          >
            {/* Marcador personalizado de la propiedad */}
            <OverlayView
              position={center}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -height,
              })}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex flex-col items-center"
              >
                {/* Pin con pulso */}
                <div className="relative">
                  <div className="absolute -inset-3 bg-[#0127AC]/20 rounded-full animate-ping" />
                  <div className="relative w-10 h-10 bg-[#0127AC] rounded-full border-[3px] border-white shadow-xl flex items-center justify-center z-10">
                    <MapPin className="h-5 w-5 text-white fill-white" />
                  </div>
                </div>
                {/* Punto debajo */}
                <div className="w-2 h-2 bg-[#0127AC] rounded-full mt-0.5 shadow-md" />
              </motion.div>
            </OverlayView>

            {/* Marcadores de lugares cercanos (si hay categoría activa) */}
            {activeCategory &&
              visiblePlaces.map((place, idx) => (
                <OverlayView
                  key={`${place.name}-${idx}`}
                  position={{ lat: place.lat, lng: place.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={(width, height) => ({
                    x: -(width / 2),
                    y: -height,
                  })}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-7 h-7 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: getCategoryColor(place.category) }}
                    >
                      {React.cloneElement(place.icon as React.ReactElement, { className: 'h-3.5 w-3.5' })}
                    </div>
                  </motion.div>
                </OverlayView>
              ))}
          </GoogleMap>
        </div>

        {/* Dirección debajo del mapa */}
        {address && (
          <div className="mt-4 flex items-start gap-3 text-neutral-600">
            <Navigation className="h-4 w-4 mt-0.5 shrink-0 text-[#0127AC]" />
            <p className="text-[14px] font-medium">{address}</p>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECCIÓN: Lugares Cercanos                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="mt-10 pt-8 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-[#0127AC]/10 rounded-lg flex items-center justify-center text-[#0127AC]">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-neutral-800">Lugares Cercanos</h3>
            <p className="text-sm text-neutral-500 font-medium tracking-tight">
              Servicios y puntos de interés en un radio de 1.5 km
            </p>
          </div>
        </div>

        {/* Filtro de categorías (Pills) */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-1.5 rounded-lg text-[13px] font-bold transition-all border ${
              !activeCategory
                ? 'bg-[#0127AC] text-white border-[#0127AC] shadow-sm'
                : 'bg-white text-neutral-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            Todos
          </button>
          {placeCategories.map((cat) => {
            const count = groupedPlaces[cat.label]?.length || 0;
            if (count === 0) return null;
            return (
              <button
                key={cat.type}
                onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                className={`px-3.5 py-1.5 rounded-lg text-[13px] font-bold transition-all border flex items-center gap-1.5 ${
                  activeCategory === cat.label
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white text-neutral-600 border-slate-200 hover:border-slate-300'
                }`}
                style={
                  activeCategory === cat.label
                    ? { backgroundColor: cat.color, borderColor: cat.color }
                    : {}
                }
              >
                {cat.icon}
                {cat.label}
                <span
                  className={`text-[11px] ml-0.5 ${
                    activeCategory === cat.label ? 'text-white/80' : 'text-neutral-400'
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Lista de lugares */}
        {loadingPlaces ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[72px] bg-slate-100 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : nearbyPlaces.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <MapPin className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p className="font-bold text-sm">No se encontraron lugares cercanos</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {visiblePlaces.map((place, index) => (
                  <motion.div
                    key={`${place.name}-${place.type}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group cursor-default"
                    onMouseEnter={() => {
                      if (map) {
                        map.panTo({ lat: place.lat, lng: place.lng });
                      }
                    }}
                  >
                    {/* Icono */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white"
                      style={{ backgroundColor: getCategoryColor(place.category) + '15' }}
                    >
                      <div style={{ color: getCategoryColor(place.category) }}>
                        {React.cloneElement(place.icon as React.ReactElement, {
                          className: 'h-5 w-5',
                        })}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-neutral-800 truncate leading-tight">
                        {place.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: getCategoryColor(place.category) + '15',
                            color: getCategoryColor(place.category),
                          }}
                        >
                          {place.category}
                        </span>
                        {place.rating && (
                          <span className="text-[11px] text-amber-600 font-bold">
                            ★ {place.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Distancia */}
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-black text-neutral-800">
                        {formatDistance(place.distance)}
                      </p>
                      <p className="text-[11px] text-neutral-400 font-medium flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {place.walkTime} min
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Botón Ver más / Ver menos */}
            {!activeCategory && nearbyPlaces.length > 8 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAllPlaces(!showAllPlaces)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-neutral-700 rounded-lg font-bold text-[13px] hover:bg-slate-50 transition-all shadow-sm"
                >
                  {showAllPlaces ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Ver menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Ver todos los lugares ({nearbyPlaces.length})
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
