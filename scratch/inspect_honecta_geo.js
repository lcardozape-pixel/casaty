
const HONECTA_SUPABASE_URL = "https://rrwluugzhnqpiedloysl.supabase.co/rest/v1";
const HONECTA_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyd2x1dWd6aG5xcGllZGxveXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODYxOTIsImV4cCI6MjA4MDM2MjE5Mn0.f8q2YhYcskBKKNMieSTIwVCt-P4kkvcauyNC__pFpxM";

async function checkFields() {
  try {
    const res = await fetch(`${HONECTA_SUPABASE_URL}/properties?limit=1`, {
      headers: {
        'apikey': HONECTA_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${HONECTA_SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    const keys = Object.keys(data[0]);
    console.log("ALL KEYS:", keys.join(", "));
    console.log("GEO KEYS:", keys.filter(k => k.toLowerCase().includes('lat') || k.toLowerCase().includes('lng') || k.toLowerCase().includes('coord') || k.toLowerCase().includes('geo')));
    
    // Si no hay keys obvias, veamos el objeto completo pero filtrado
    const obj = data[0];
    const geoInfo = {};
    for (const k in obj) {
        if (typeof obj[k] === 'object' || k.includes('lat') || k.includes('lng') || k.includes('location')) {
            geoInfo[k] = obj[k];
        }
    }
    console.log("POTENTIAL GEO INFO:", JSON.stringify(geoInfo, null, 2));
  } catch (e) {
    console.error(e);
  }
}

checkFields();
