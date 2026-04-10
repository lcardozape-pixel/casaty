async function inspectProperties() {
  const HONECTA_API_URL = "https://app.honectapro.com/api/v1";
  const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";

  try {
    const url = `${HONECTA_API_URL}/properties/public?agent_id=${HONECTA_AGENT_ID}&representing_agent_id=${HONECTA_AGENT_ID}`;
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error(text);
      return;
    }

    const data = await response.json();
    const properties = Array.isArray(data) ? data : (data.data || []);
    
    console.log(`Found ${properties.length} properties.`);
    
    // Buscar campos relacionados con el estado
    const statusFields = ['status', 'is_sold', 'availability', 'published', 'state', 'listing_status', 'property_status'];
    
    properties.forEach((p, i) => {
      // Solo imprimir si tiene algún campo de estado "no disponible" o similar, o los primeros 5
      const statusInfo = statusFields.map(f => p[f] ? `${f}: ${p[f]}` : null).filter(Boolean);
      
      if (i < 5 || statusInfo.some(s => s.toLowerCase().includes('vendid') || s.toLowerCase().includes('sold'))) {
        console.log(`\n--- Property ${i+1}: ${p.title} ---`);
        if (statusInfo.length > 0) {
          console.log(statusInfo.join(', '));
        } else {
          console.log("No common status fields found.");
        }
        
        if (i === 0) {
          console.log("\nAll fields in first property sample:");
          console.log(Object.keys(p).join(', '));
        }
      }
    });

    // Contar estados únicos
    const statusCounts = {};
    properties.forEach(p => {
      const s = p.status || 'unknown';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });
    console.log("\nStatus Counts (field 'status'):", statusCounts);

  } catch (error) {
    console.error("Fetch Exception:", error);
  }
}

inspectProperties();
