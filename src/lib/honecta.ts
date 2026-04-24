import { Property } from "./types";
import { generatePropertySlug } from "./slugs";

const HONECTA_API_URL = process.env.NEXT_PUBLIC_HONECTA_API_URL || "https://app.honectapro.com/api/v1";
const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";
const HONECTA_API_KEY = process.env.HONECTA_API_KEY;

/**
 * Mapea una propiedad de Honecta (API) al formato de Casaty
 */
export function mapHonectaToCasaty(hp: Record<string, any>): Property {
  // Detectar tipo de operación
  const listingType = (hp.listing_type || hp.operation_type || "").toLowerCase();
  const isRent = listingType.includes("rent") || listingType.includes("alquiler");

  // Manejo de moneda (La API de Honecta ahora proporciona ambos precios calculados al tipo de cambio real)
  const currency = hp.currency || hp.price_currency || "USD";
  const price = Number(hp.price || 0);
  
  const solesAmount = Number(hp.price_pen || 0);
  const dollarsAmount = Number(hp.price_usd || 0);


  // Precios formateados explícitos sin decimales
  const suffix = isRent ? "/mes" : "";
  const formattedPricePEN = `S/ ${Math.round(solesAmount).toLocaleString("en-US")}${suffix}`;
  const formattedPriceUSD = `$ ${Math.round(dollarsAmount).toLocaleString("en-US")}${suffix}`;
  const mainFormattedPrice = currency === "PEN" ? formattedPricePEN : formattedPriceUSD;


  // Imágenes
  const defaultImage = "/Imagenes/piura-panorama.png";
  let allImages: string[] = [];
  if (hp.images) {
    if (Array.isArray(hp.images)) {
      allImages = hp.images.map((img: any) => {
        if (typeof img === 'string') return img;
        return img.url || img.literal || img.file_url;
      }).filter((img): img is string => Boolean(img));
    }
  }
  const mainImage = allImages.length > 0 ? allImages[0] : defaultImage;

  // Tipos — Mapeo exhaustivo de todos los tipos que puede devolver la API de Honecta
  const typeMap: Record<string, string> = {
    // Inglés
    'house': 'Casa',
    'apartment': 'Departamento',
    'office': 'Oficina',
    'land': 'Terreno',
    'commercial': 'Local Comercial',
    'industrial': 'Local Industrial',
    'warehouse': 'Local Industrial',
    // Español (como llega de la API)
    'casa': 'Casa',
    'departamento': 'Departamento',
    'depa': 'Departamento',
    'oficina': 'Oficina',
    'terreno': 'Terreno',
    'local comercial': 'Local Comercial',
    'local industrial': 'Local Industrial',
    'local': 'Local Comercial',
    'almacen': 'Local Industrial',
    'bodega': 'Local Industrial',
  };
  const propertyType = typeMap[(hp.property_type || hp.type || '').toLowerCase()] || hp.property_type || hp.type || 'Propiedad';
  
  const features = hp.features || {};
  const rawTotalArea = Number(hp.total_area || features.landArea || 0);
  const rawBuiltArea = Number(hp.built_area || features.sqft || 0);
  const rawFloors = Number(hp.floors || hp.built_floors || features.floors || 0);
  const rawFloorNumber = features.floorNumber || hp.floor_number || hp.floor || features.floor || undefined;
  const rawAge = hp.antiquity || features.antiquity || features.age || hp.age || hp.property_age || '';
  
  // Si no hay terreno (totalArea) pero sí hay área construida (ej. dpto), lo dejamos en vacío para no repetir el mismo valor
  let formattedArea = rawTotalArea > 0 ? `${rawTotalArea} m²` : undefined;

  const resolvedAgeStr = String(rawAge).trim();
  const resolvedAge = (resolvedAgeStr === '0' || resolvedAgeStr.toLowerCase() === 'a estrenar') ? 'A estrenar' : (rawAge ? String(rawAge) : undefined);

  const getNum = (v1: any, v2: any) => {
    const n1 = Number(v1); if (!isNaN(n1) && n1 > 0) return n1;
    const n2 = Number(v2); if (!isNaN(n2) && n2 > 0) return n2;
    return 0;
  };

  // Agente: Manejo robusto para API (Prioriza 'profiles' si viene de Honecta)
  const profile = hp.profiles || {};
  const agentData = {
    name: profile.full_name || hp.agent?.full_name || hp.agent?.name || 'Agente Casaty',
    photo: profile.avatar_url || hp.agent?.image_url || hp.agent?.photo || hp.agent?.avatar_url || hp.agent?.picture_url || hp.agent?.profile_image_url || hp.agent?.profile_photo_url || '',
    phone: profile.phone || hp.agent?.phone || hp.agent?.mobile || '',
    email: profile.email || hp.agent?.email || '',
    agency: profile.agency_name || hp.agent?.agency_name || hp.agent?.agency?.name || hp.agency?.name || 'Casaty',
    agencyLogo: profile.agency_logo_url || hp.agent?.agency_logo_url || hp.agent?.agency?.logo_url || hp.agent?.agency?.image_url || hp.agency?.logo_url || hp.agency?.logo || '',
    mvcs: profile.mvcs_code || '',
    position: profile.position || ''
  };

  const result: Property = {
    id: hp.id,
    title: hp.title || 'Propiedad sin título',
    location: `${hp.district || hp.city || "Piura"}`,
    price: mainFormattedPrice,
    priceAmount: solesAmount,
    priceAltAmount: dollarsAmount,
    pricePEN: formattedPricePEN,
    priceUSD: formattedPriceUSD,
    priceUsd: currency === "PEN" ? formattedPriceUSD : formattedPricePEN,
    beds: getNum(hp.bedrooms, features.beds),
    baths: getNum(hp.bathrooms, features.baths),
    garage: getNum(hp.parking_spaces, features.parkingSpaces),
    area: formattedArea as string,
    sqft: rawBuiltArea > 0 ? rawBuiltArea : undefined,
    floors: rawFloors > 0 ? rawFloors : undefined,
    floorNumber: rawFloorNumber ? String(rawFloorNumber) : undefined,
    age: resolvedAge,
    hasPool: hp.has_pool === true || hp.has_pool === 'true' || hp.has_pool === 1 || features.hasPool === 'yes' || features.hasPool === 'si' || features.hasPool === true,
    hasElevator: hp.has_elevator === true || hp.has_elevator === 'true' || hp.has_elevator === 1 || features.hasElevator === 'yes' || features.hasElevator === 'si' || features.hasElevator === true,
    description: hp.description || hp.summary || '',
    image: mainImage,
    images: allImages,
    propertyType,
    type: isRent ? 'Alquiler' : 'Venta',
    city: hp.city || 'Piura',
    district: hp.district || '',
    address: hp.address || '',
    amenities: Array.isArray(hp.amenities) ? hp.amenities : [],
    agent: agentData,
    // Coordenadas listas para el mapa (Soporta formato "lat, lng" de Honecta)
    lat: hp.latitude ? Number(hp.latitude) : undefined,
    lng: hp.longitude ? Number(hp.longitude) : undefined,
    slug: generatePropertySlug(hp.id, hp.title || ''),
    status: hp.status
  };

  // Si no hay lat/lng individuales, intentar extraer del campo 'location' (string: "lat, lng")
  if ((!result.lat || !result.lng) && typeof hp.location === 'string' && hp.location.includes(',')) {
    const parts = hp.location.split(',');
    if (parts.length === 2) {
      result.lat = Number(parts[0].trim());
      result.lng = Number(parts[1].trim());
    }
  }

  return result;
}

/**
 * Obtiene todas las propiedades directamente de la API de Honecta
 */
export async function getPublicProperties(): Promise<Property[]> {
  try {
    const agentId = HONECTA_AGENT_ID;
    const url = `${HONECTA_API_URL}/properties/public?agent_id=${agentId}&representing_agent_id=${agentId}&t=${Date.now()}`;
    
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (!response.ok) return [];

    const data = await response.json();
    const rawProperties = Array.isArray(data) ? data : (data.data || []);
    
    return rawProperties.map(mapHonectaToCasaty);
  } catch (error) {
    console.error("Honecta API Fetch Exception:", error);
    return [];
  }
}

/**
 * Obtiene una propiedad específica por ID usando la API
 */
export async function getHonectaPropertyById(id: string): Promise<Property | null> {
  // Intentar encontrar en la lista general de propiedades (aprovecha la caché de 1h)
  const all = await getPublicProperties();
  const directMatch = all.find(p => p.id === id);
  if (directMatch) return directMatch;

  // Si no está en la lista general (ej: es de la red MLS), intentamos fetch individual
  try {
    const response = await fetch(`${HONECTA_API_URL}/properties/public/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return mapHonectaToCasaty(data.data || data);
    }
  } catch (error) {
    console.error(`Error fetching individual property ${id}:`, error);
  }

  return null;
}

/**
 * Envía un lead a la API de Honecta
 */
export async function sendLeadToHonecta(lead: {
  name: string;
  phone: string;
  email: string;
  source: string;
  notes?: string;
  agent_id?: string;
  property_id?: string;
  tags?: string[];
}) {
  try {
    // Según la captura, para leads se usa Authorization: Bearer <api_key>
    // URL: /leads/external
    const response = await fetch(`${HONECTA_API_URL}/leads/external`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HONECTA_API_KEY || ""
      },
      body: JSON.stringify({
        name: lead.name,
        full_name: lead.name,
        phone: lead.phone,
        email: lead.email,
        source: "API Pública",
        notes: lead.notes,
        agent_id: lead.agent_id || HONECTA_AGENT_ID,
        property_id: lead.property_id,
        tags: lead.tags || ["website"]
      })
    });

    if (!response.ok) {
      console.error("Honecta Lead API Error:", await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Exception sending lead to Honecta:", error);
    return null;
  }
}

/**
 * Registra una visita/cita en el calendario de Honecta
 */
export async function scheduleVisitToHonecta(appointment: {
  name: string;
  phone: string;
  email: string;
  property_id: string;
  date: string; // Formato YYYY-MM-DD o similar
  time: string; // Formato HH:mm
  notes?: string;
  agent_id?: string;
  lead_id?: string;
}) {
  try {
    const response = await fetch(`${HONECTA_API_URL}/appointments/external`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HONECTA_API_KEY || ""
      },
      body: JSON.stringify({
        ...appointment,
        agent_id: appointment.agent_id || HONECTA_AGENT_ID,
        source: "API Pública",
        status: "pending"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Honecta Appointment API Error:", errorText);
      // Retornamos el error para que el llamador pueda decidir qué hacer (ej. avisar al usuario sobre permisos)
      return { success: false, status: response.status, error: errorText };
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    console.error("Exception scheduling visit in Honecta:", error);
    return { success: false, error: String(error) };
  }
}

export const getHonectaProperties = getPublicProperties;

