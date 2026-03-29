import { Property } from "./types";

const HONECTA_API_URL = process.env.NEXT_PUBLIC_HONECTA_API_URL || "https://app.honectapro.com";
const HONECTA_AGENT_ID = process.env.NEXT_PUBLIC_HONECTA_AGENT_ID || "46a68490-51ae-40db-b8f7-4ded19c64301";
const HONECTA_API_KEY = process.env.HONECTA_API_KEY;

// Supabase de Honecta — fuente de respaldo
const HONECTA_SUPABASE_URL = "https://rrwluugzhnqpiedloysl.supabase.co/rest/v1";
const HONECTA_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyd2x1dWd6aG5xcGllZGxveXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODYxOTIsImV4cCI6MjA4MDM2MjE5Mn0.f8q2YhYcskBKKNMieSTIwVCt-P4kkvcauyNC__pFpxM";

/**
 * Mapea una propiedad de Honecta (API o Supabase) al formato de Casaty
 */
export function mapHonectaToCasaty(hp: any): Property {
  const currencySymbol = hp.currency === "USD" ? "$" : "S/";
  const price = Number(hp.price || 0);
  const formattedPrice = `${currencySymbol} ${price.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
  
  // Precio en moneda alternativa (tipo de cambio aprox)
  let priceUsd: string | undefined;
  if (hp.currency === "PEN" && price > 0) {
    const usd = Math.round(price / 3.49);
    priceUsd = `$ ${usd.toLocaleString("en-US")}`;
  } else if (hp.currency === "USD" && price > 0) {
    const pen = Math.round(price * 3.49);
    priceUsd = `S/ ${pen.toLocaleString("en-US")}`;
  }

  // Manejo de imágenes
  const defaultImage = "/Imagenes/piura-panorama.png";
  let allImages: string[] = [];
  if (hp.images) {
    if (Array.isArray(hp.images)) {
      allImages = hp.images.map((img: any) => {
        if (typeof img === 'string') return img;
        return img.url || img.literal || img.file_url;
      }).filter(Boolean);
    }
  }
  const mainImage = allImages.length > 0 ? allImages[0] : defaultImage;

  // Mapeo del tipo de propiedad
  const typeMap: Record<string, string> = {
    'house': 'Casa',
    'apartment': 'Departamento',
    'office': 'Oficina',
    'land': 'Terreno',
    'commercial': 'Local comercial',
    'casa': 'Casa',
    'depa': 'Departamento',
    'departamento': 'Departamento',
    'oficina': 'Oficina',
    'terreno': 'Terreno',
    'local': 'Local comercial',
    'local_comercial': 'Local comercial',
  };

  // Determinar si es Alquiler o Venta
  const rawType = (hp.listing_type || hp.operation_type || '').toLowerCase();
  const isRent = rawType === 'rent' || rawType === 'alquiler' || rawType === 'renta';

  // Extraer información adicional de 'features' por si los campos principales están vacíos
  const features = hp.features || {};
  
  const rawTotalArea = Number(hp.total_area || features.landArea || 0);
  const rawBuiltArea = Number(hp.built_area || features.sqft || 0);

  let formattedArea = "";
  if (rawTotalArea > 0 && rawBuiltArea > 0) {
    if (rawTotalArea !== rawBuiltArea) {
      formattedArea = `${rawTotalArea} m² / ${rawBuiltArea} m²`;
    } else {
      formattedArea = `${rawTotalArea} m²`;
    }
  } else if (rawTotalArea > 0) {
    formattedArea = `${rawTotalArea} m²`;
  } else if (rawBuiltArea > 0) {
    formattedArea = `${rawBuiltArea} m²`;
  } else {
    formattedArea = "0 m²";
  }

  const getNum = (val1: any, val2: any) => {
    const num1 = Number(val1);
    if (!isNaN(num1) && num1 > 0) return num1;
    const num2 = Number(val2);
    if (!isNaN(num2) && num2 > 0) return num2;
    return 0;
  };

  const finalBeds = getNum(hp.bedrooms, features.beds);
  const finalBaths = getNum(hp.bathrooms, features.baths);
  const finalGarage = getNum(hp.parking_spaces, features.parkingSpaces);

  // Intentar extraer amenidades
  const extractedAmenities: string[] = [];
  if (Array.isArray(hp.amenities)) {
    extractedAmenities.push(...hp.amenities.filter(Boolean).map(String));
  } else if (typeof hp.amenities === 'string' && hp.amenities.trim() !== '') {
    extractedAmenities.push(...hp.amenities.split(',').map((s: string) => s.trim()));
  }
  
  if (features && typeof features === 'object') {
    const skipKeys = ['beds', 'baths', 'parkingSpaces', 'landArea', 'sqft', 'subType'];
    for (const [key, value] of Object.entries(features)) {
      if (skipKeys.includes(key)) continue;

      if (Array.isArray(value)) {
        // e.g., "nearby": ["Colegios", "Parques"], "facilities": ["Agua"]
        extractedAmenities.push(...value.filter(Boolean).map(String));
      } else if (typeof value === 'boolean' && value === true) {
        extractedAmenities.push(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
      } else if (typeof value === 'string') {
        const lowerVal = value.trim().toLowerCase();
        if (lowerVal === 'true' || lowerVal === 'yes' || lowerVal === 'si') {
          extractedAmenities.push(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
        } else if (key === 'amenities' && lowerVal !== '') {
          extractedAmenities.push(...value.split(',').map((s: string) => s.trim()));
        }
      }
    }
  }

  const finalAmenities = Array.from(new Set(extractedAmenities)).filter(Boolean);

  return {
    id: hp.id,
    title: hp.title || 'Propiedad sin título',
    location: `${hp.district || hp.city || "Piura"}`,
    price: isRent ? `${formattedPrice}/mes` : formattedPrice,
    priceUsd: priceUsd,
    beds: finalBeds,
    baths: finalBaths,
    garage: finalGarage,
    area: formattedArea,
    image: mainImage,
    images: allImages.length > 0 ? allImages : undefined,
    type: isRent ? "Alquiler" : "Venta",
    propertyType: typeMap[(hp.property_type || hp.type || '').toLowerCase()] || hp.property_type || hp.type || 'Propiedad',
    description: hp.description || '',
    address: hp.address || '',
    city: hp.city || 'Piura',
    district: hp.district || '',
    label: hp.is_featured ? "DESTACADA" : undefined,
    maintenance: hp.maintenance_fee ? `${currencySymbol} ${Number(hp.maintenance_fee).toLocaleString("en-US")}` : undefined,
    subType: hp.property_sub_type || hp.subtype || features.subType || undefined,
    amenities: finalAmenities.length > 0 ? finalAmenities : undefined,
    agent: {
      name: hp.profiles?.full_name || hp.agent?.name || hp.agent?.full_name || hp.agent?.first_name || '',
      photo: hp.profiles?.avatar_url || hp.agent?.avatar || hp.agent?.photo || hp.agent?.profile_picture || hp.agency?.logo || undefined,
      agency: hp.profiles?.agency || hp.agency?.name || hp.agent?.agency_name || hp.agency || ''
    }
  };
}

/**
 * Obtiene las propiedades de Honecta.
 * Intenta primero con el API público oficial y usa Supabase como respaldo.
 */
export async function getPublicProperties(): Promise<Property[]> {
  // 1. Intentar con el API público oficial (ahora que está corregido)
  try {
    const url = `${HONECTA_API_URL}/api/v1/properties/public?agent_id=${HONECTA_AGENT_ID}`;
    console.log(`Honecta API: Fetching from ${url}...`);
    
    const response = await fetch(url, { 
      next: { revalidate: 600 } 
    });

    if (response.ok) {
      const data = await response.json();
      let rawProperties = [];
      
      if (Array.isArray(data)) rawProperties = data;
      else if (data.data && Array.isArray(data.data)) rawProperties = data.data;
      else if (data.properties && Array.isArray(data.properties)) rawProperties = data.properties;
      
      if (rawProperties.length > 0) {
        console.log(`Honecta API: ${rawProperties.length} properties loaded successfully.`);
        return rawProperties.map(mapHonectaToCasaty);
      }
    } else {
      console.warn(`Honecta API failed with status ${response.status}. Trying Supabase fallback...`);
    }
  } catch (error) {
    console.error("Honecta API error, trying Supabase fallback:", error);
  }

  // 2. Respaldo: Supabase directo (el que usamos cuando el API fallaba)
  return await fetchFromSupabase();
}

/**
 * Obtiene las propiedades directamente de Supabase como respaldo.
 */
async function fetchFromSupabase(): Promise<Property[]> {
  try {
    const supabaseUrl = `${HONECTA_SUPABASE_URL}/properties?select=*&status=eq.active&order=created_at.desc`;
    console.log("Honecta Supabase: Fetching as fallback...");
    
    const response = await fetch(supabaseUrl, {
      headers: {
        'apikey': HONECTA_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${HONECTA_SUPABASE_ANON_KEY}`,
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      console.error(`Honecta Supabase fallback failed (${response.status})`);
      return [];
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      console.log(`Honecta Supabase fallback: ${data.length} properties loaded.`);
      return data.map(mapHonectaToCasaty);
    }
    return [];
  } catch (error) {
    console.error("Honecta Supabase fallback error:", error);
    return [];
  }
}

/**
 * Envía un lead al endpoint externo de Honecta
 */
export async function sendLeadToHonecta(leadData: any) {
  if (!HONECTA_API_KEY) {
    console.warn("HONECTA_API_KEY not configured. Skipping external lead sync.");
    return null;
  }

  try {
    const response = await fetch(`${HONECTA_API_URL}/api/v1/leads/external`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HONECTA_API_KEY}`,
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error sending lead to Honecta:", errorText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Network error sending lead to Honecta:", error);
    return null;
  }
}
