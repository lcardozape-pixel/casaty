
// Versión auto-contenida del mapeador para testeo
function mapHonectaToCasaty(hp) {
  const currency = hp.currency || hp.price_currency || "USD";
  const currencySymbol = currency === "USD" ? "$" : "S/";
  const price = Number(hp.price || 0);
  const formattedPrice = `${currencySymbol} ${price.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
  
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

  const defaultImage = "/Imagenes/piura-panorama.png";
  let allImages = [];
  if (hp.images && Array.isArray(hp.images)) {
      allImages = hp.images.map(img => typeof img === 'string' ? img : (img.url || img.file_url)).filter(Boolean);
  }
  const mainImage = allImages.length > 0 ? allImages[0] : defaultImage;

  const rawType = (hp.listing_type || hp.operation_type || '').toLowerCase();
  const isRent = rawType === 'rent' || rawType === 'alquiler' || rawType === 'renta';

  return {
    id: hp.id,
    title: hp.title || 'Propiedad sin título',
    price: isRent ? `${formattedPrice}/mes` : formattedPrice,
    priceAmount: solesAmount,
    image: mainImage,
    type: isRent ? 'Alquiler' : 'Venta'
  };
}

const API_URL = "https://app.honectapro.com";
const AGENT_ID = "b47e7049-5981-42df-b76b-958f0cf45f29";
const API_KEY = "hk_live_4wL5nzvtEB7KQrmMzbIQNWaQnBgqemYe";

async function verifyMapping() {
  try {
    const res = await fetch(`${API_URL}/api/properties?agent_id=${AGENT_ID}`, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY
      }
    });
    const data = await res.json();
    const raw = data.data || [];
    
    console.log(`Verifying ${raw.length} properties...`);
    
    const mapped = raw.map(p => mapHonectaToCasaty(p));
    
    mapped.forEach((p, i) => {
        console.log(`[${i}] ID: ${p.id}, Title: ${p.title}, Price: ${p.price}, Type: ${p.type}, Image: ${p.image.substring(0, 30)}...`);
    });
    
  } catch (e) {
    console.error(e);
  }
}

verifyMapping();
