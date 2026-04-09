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

  // Agente: Manejo robusto para API (objeto) o Supabase (puede ser array)
  const rawAgent = Array.isArray(hp.agent) ? hp.agent[0] : hp.agent;
  
  const agentData = {
    name: rawAgent?.full_name || rawAgent?.name || 'Agente Casaty',
    photo: rawAgent?.image_url || rawAgent?.photo || rawAgent?.avatar_url || rawAgent?.picture || '',
    phone: rawAgent?.phone || rawAgent?.mobile || rawAgent?.whatsapp || '',
    email: rawAgent?.email || '',
    agency: rawAgent?.agency_name || rawAgent?.agency?.name || 'Casaty'
  };

  return {
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
    agent: agentData
  };
}

/**
 * Backup: Obtiene datos directamente de Supabase de Honecta
 */
async function fetchFromHonectaSupabase(): Promise<Property[]> {
  try {
    console.log(`Honecta Fallback: Fetching properties and agent separately for ID: ${HONECTA_AGENT_ID}`);
    
    // 1. Obtener propiedades
    const propRes = await fetch(`${HONECTA_SUPABASE_URL}/properties?agent_id=eq.${HONECTA_AGENT_ID}&select=*`, {
      headers: {
        'apikey': HONECTA_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${HONECTA_SUPABASE_ANON_KEY}`
      }
    });

    if (!propRes.ok) throw new Error(`Supabase Prop Error: ${propRes.status}`);
    const propertiesData = await propRes.json();

    // 2. Intentar obtener datos del agente de forma independiente
    let agentInfo: any = null;
    const tablesToTry = ['agents', 'profiles', 'agent_profiles'];
    
    for (const table of tablesToTry) {
      try {
        const agentRes = await fetch(`${HONECTA_SUPABASE_URL}/${table}?id=eq.${HONECTA_AGENT_ID}&select=*`, {
          headers: {
            'apikey': HONECTA_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${HONECTA_SUPABASE_ANON_KEY}`
          }
        });
        if (agentRes.ok) {
          const result = await agentRes.json();
          if (result && result.length > 0) {
            agentInfo = result[0];
            console.log(`Honecta: Agent found in table '${table}'`);
            break;
          }
        }
      } catch (e) {
        // Continue to next table
      }
    }

    if (!agentInfo) {
      console.warn("Honecta: Agent photo not found in common tables.");
    }

    // 3. Fusionar y mapear
    return propertiesData.map((p: any) => {
      // Inyectamos el agente encontrado si existe
      if (agentInfo) p.agent = agentInfo;
      return mapHonectaToCasaty(p);
    });

  } catch (error) {
    console.error("Honecta Fallback Final Failure:", error);
    return [];
  }
}

/**
 * Obtiene todas las propiedades (Con fallback)
 */
export async function getPublicProperties(): Promise<Property[]> {
  try {
    const response = await fetch(`${HONECTA_API_URL}/api/properties?agent_id=${HONECTA_AGENT_ID}`, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': HONECTA_API_KEY || ''
      },
      next: { revalidate: 3600 }
    });

    if (response.status === 404) {
      console.warn("Honecta API returned 404. Using Supabase fallback.");
      return await fetchFromHonectaSupabase();
    }

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    const rawProperties = Array.isArray(data) ? data : (data.data || []);
    return rawProperties.map(mapHonectaToCasaty);
  } catch (error) {
    console.error("Using Supabase fallback due to exception:", error);
    return await fetchFromHonectaSupabase();
  }
}

export async function getHonectaPropertyById(id: string): Promise<Property | null> {
  // 1. Intentar encontrar en la lista general de propiedades del agente (rápido y con caché)
  const all = await getPublicProperties();
  const directMatch = all.find(p => p.id === id);
  if (directMatch) return directMatch;

  // 2. Si no está en su lista (ej: propiedad de la red MLS o compartida directa),
  // intentar buscarla individualmente por ID en la base de datos de Honecta
  try {
    console.log(`Honecta: Propiedad no encontrada en catálogo del agente. Buscando individualmente ID: ${id}`);
    const res = await fetch(`${HONECTA_SUPABASE_URL}/properties?id=eq.${id}&select=*`, {
      headers: {
        'apikey': HONECTA_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${HONECTA_SUPABASE_ANON_KEY}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        console.log(`Honecta: Propiedad encontrada mediante búsqueda individual por ID.`);
        return mapHonectaToCasaty(data[0]);
      }
    }
  } catch (error) {
    console.error(`Honecta: Error en búsqueda individual de propiedad ${id}:`, error);
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
    const response = await fetch(`${HONECTA_API_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HONECTA_API_KEY || ""
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
      console.error("Honecta Lead Error:", await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending lead to Honecta:", error);
    return null;
  }
}

export const getHonectaProperties = getPublicProperties;

