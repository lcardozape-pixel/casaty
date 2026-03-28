import { Property } from "./types";

const HONECTA_API_URL = process.env.NEXT_PUBLIC_HONECTA_API_URL || "https://app.honectapro.com";
const HONECTA_AGENT_ID = process.env.NEXT_PUBLIC_HONECTA_AGENT_ID || "46a68490-51ae-40db-b8f7-4ded19c64301";
const HONECTA_API_KEY = process.env.HONECTA_API_KEY;

// Supabase de Honecta — fuente directa de datos (el endpoint público /api/v1 tiene un bug 500)
const HONECTA_SUPABASE_URL = "https://rrwluugzhnqpiedloysl.supabase.co/rest/v1";
const HONECTA_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyd2x1dWd6aG5xcGllZGxveXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODYxOTIsImV4cCI6MjA4MDM2MjE5Mn0.f8q2YhYcskBKKNMieSTIwVCt-P4kkvcauyNC__pFpxM";

export interface HonectaProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "PEN" | "USD";
  listing_type: "sale" | "rent";
  property_type: string;
  address: string;
  district: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  parking_spaces: number;
  total_area: number;
  images: { url: string }[] | string[];
  is_featured?: boolean;
  status?: string;
}

/**
 * Mapea una propiedad de Honecta/Supabase al formato de Casaty
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
      allImages = hp.images.map((img: any) => typeof img === 'string' ? img : img.url).filter(Boolean);
    }
  }
  const mainImage = allImages.length > 0 ? allImages[0] : defaultImage;

  // Mapeo del tipo de propiedad
  const typeMap: Record<string, string> = {
    'house': 'Casa',
    'apartment': 'Depa',
    'office': 'Oficina',
    'land': 'Terreno',
    'commercial': 'Local comercial',
    'casa': 'Casa',
    'depa': 'Depa',
    'departamento': 'Depa',
    'oficina': 'Oficina',
    'terreno': 'Terreno',
    'local': 'Local comercial',
    'local_comercial': 'Local comercial',
  };

  return {
    id: hp.id,
    title: hp.title || 'Propiedad sin título',
    location: `${hp.district || hp.city || "Piura"}`,
    price: hp.listing_type === "rent" ? `${formattedPrice}/mes` : formattedPrice,
    priceUsd: priceUsd,
    beds: hp.bedrooms || 0,
    baths: hp.bathrooms || 0,
    garage: hp.parking_spaces || 0,
    area: `${hp.total_area || 0} m²`,
    image: mainImage,
    images: allImages.length > 0 ? allImages : undefined,
    type: hp.listing_type === "rent" ? "Alquiler" : "Venta",
    propertyType: typeMap[(hp.property_type || '').toLowerCase()] || hp.property_type || 'Propiedad',
    description: hp.description || '',
    address: hp.address || '',
    city: hp.city || 'Piura',
    district: hp.district || '',
    label: hp.is_featured ? "DESTACADA" : undefined,
  };
}

/**
 * Obtiene las propiedades activas directamente de Supabase (Honecta)
 * El endpoint público /api/v1/properties/public tiene un bug (Error 500 Database error),
 * así que consumimos Supabase directo como lo hace el dashboard de Honecta.
 */
export async function getPublicProperties(): Promise<Property[]> {
  try {
    // Primero intentamos con Supabase directo (funciona siempre)
    const supabaseUrl = `${HONECTA_SUPABASE_URL}/properties?select=*&status=eq.active&order=created_at.desc`;
    
    const response = await fetch(supabaseUrl, {
      headers: {
        'apikey': HONECTA_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${HONECTA_SUPABASE_ANON_KEY}`,
      },
      next: { revalidate: 600 }, // Caché de 10 minutos
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Honecta Supabase Error (${response.status}):`, errorText);
      
      // Fallback al API público de Honecta (puede fallar)
      return await fetchFromPublicApi();
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      console.log(`Honecta Supabase: ${data.length} properties loaded`);
      return data.map(mapHonectaToCasaty);
    }

    return [];
  } catch (error) {
    console.error("Honecta Supabase Fetch Error:", error);
    return await fetchFromPublicApi();
  }
}

/**
 * Fallback: endpoint público de Honecta (actualmente con bug 500)
 */
async function fetchFromPublicApi(): Promise<Property[]> {
  try {
    const url = `${HONECTA_API_URL}/api/v1/properties/public?agent_id=${HONECTA_AGENT_ID}`;
    const response = await fetch(url, { next: { revalidate: 600 } });

    if (!response.ok) return [];

    const data = await response.json();
    let rawProperties = [];
    if (Array.isArray(data)) rawProperties = data;
    else if (data.data && Array.isArray(data.data)) rawProperties = data.data;
    else if (data.properties && Array.isArray(data.properties)) rawProperties = data.properties;
    
    return rawProperties.map(mapHonectaToCasaty);
  } catch (error) {
    console.error("Honecta Public API Fallback Error:", error);
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
