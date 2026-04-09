
const API_URL = "https://app.honectapro.com";
const API_KEY = "hk_live_4wL5nzvtEB7KQrmMzbIQNWaQnBgqemYe";

async function discoverAgenty() {
  try {
    // Intentamos obtener propiedades sin filtro de agente para explorar
    console.log("Fetching ALL properties (discovery)...");
    const res = await fetch(`${API_URL}/api/properties`, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY
      }
    });
    
    console.log("Status:", res.status);
    const data = await res.json();
    const props = data.data || data;
    console.log("Total properties in API:", Array.isArray(props) ? props.length : "N/A");
    
    if (Array.isArray(props) && props.length > 0) {
        console.log("Sample Agent Info from API:");
        props.slice(0, 3).forEach(p => {
            console.log(`- Prop ID: ${p.id}, Agent ID: ${p.agent_id || p.agent?.id}`);
        });
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

discoverAgenty();
