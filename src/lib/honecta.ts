import { Property } from "./types";

const HONECTA_API_URL = process.env.NEXT_PUBLIC_HONECTA_API_URL || "https://app.honectapro.com/api/v1";
const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";
const HONECTA_API_KEY = process.env.HONECTA_API_KEY;

/**
 * Mapea una propiedad de Honecta (API) al formato de Casaty
 */
export function mapHonectaToCasaty(hp: Record<string, any>): Property {
  // Manejo de moneda y precios
  const currency = hp.currency || hp.price_currency || "USD";
  const currencySymbol = currency === "USD" ? "$" : "S/";
  const price = Number(hp.price || 0);
  const formattedPrice = `${currencySymbol} ${price.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
  
  // Precios numéricos para la calculadora
  const apiPriceAmount = Number(hp.price_amount || 0);
  const apiPriceAltAmount = Number(hp.price_alt_amount || 0);

  let solesAmount = 0;
  let dollarsAmount = 0;

  if (currency === "PEN") {
    solesAmount = price;
    dollarsAmount = apiPriceAltAmount > 0 ? apiPriceAltAmount : Math.round(price / 3.8);
  } else {
    dollarsAmount = price;
    solesAmount = apiPriceAltAmount > 0 ? apiPriceAltAmount : Math.round(price * 3.8);
  }

  // Precio secundario
  let priceUsdFormatted: string | undefined;
  if (currency === "PEN") {
    priceUsdFormatted = `$ ${dollarsAmount.toLocaleString("en-US")}`;
  } else {
    priceUsdFormatted = `S/ ${solesAmount.toLocaleString("en-US")}`;
  }

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

  // Tipos
  const typeMap: Record<string, string> = {
    'house': 'Casa', 'apartment': 'Departamento', 'office': 'Oficina',
    'land': 'Terreno', 'commercial': 'Local comercial', 'casa': 'Casa',
    'depa': 'Departamento', 'oficina': 'Oficina', 'terreno': 'Terreno',
    'local': 'Local comercial'
  };
  const propertyType = typeMap[(hp.property_type || hp.type || '').toLowerCase()] || hp.property_type || hp.type || 'Propiedad';
  
  const rawType = (hp.listing_type || hp.operation_type || '').toLowerCase();
  const isRent = rawType === 'rent' || rawType === 'alquiler' || rawType === 'renta';

  // Características
  const features = hp.features || {};
  const rawTotalArea = Number(hp.total_area || features.landArea || 0);
  const rawBuiltArea = Number(hp.built_area || features.sqft || 0);

  let formattedArea = rawBuiltArea > 0 ? `${rawBuiltArea} m²` : (rawTotalArea > 0 ? `${rawTotalArea} m²` : "0 m²");

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
    price: isRent ? `${formattedPrice}/mes` : formattedPrice,
    priceAmount: solesAmount,
    priceAltAmount: dollarsAmount,
    priceUsd: priceUsdFormatted,
    beds: getNum(hp.bedrooms, features.beds),
    baths: getNum(hp.bathrooms, features.baths),
    garage: getNum(hp.parking_spaces, features.parkingSpaces),
    area: formattedArea,
    sqft: rawBuiltArea,
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
    lng: hp.longitude ? Number(hp.longitude) : undefined
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
  tags?: string[];
}) {
  try {
    // Según la captura, para leads se usa Authorization: Bearer <api_key>
    // URL: /leads/external
    const response = await fetch(`${HONECTA_API_URL}/leads/external`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HONECTA_API_KEY}`
      },
      body: JSON.stringify({
        full_name: lead.name,
        phone: lead.phone,
        email: lead.email,
        source: lead.source,
        notes: lead.notes,
        agent_id: lead.agent_id || HONECTA_AGENT_ID,
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

export const getHonectaProperties = getPublicProperties;

