async function inspectAllProperties() {
  const HONECTA_API_URL = "https://app.honectapro.com/api/v1";
  const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";
  const HONECTA_API_KEY = process.env.HONECTA_API_KEY;

  try {
    // Intentar endpoint de propiedades general (privado)
    const url = `${HONECTA_API_URL}/properties?agent_id=${HONECTA_AGENT_ID}`;
    console.log(`Fetching from PRIVATE endpoint: ${url}`);
    
    const response = await fetch(url, {
      headers: { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${HONECTA_API_KEY}`
      }
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    const properties = Array.isArray(data) ? data : (data.data || []);
    
    console.log(`Found ${properties.length} properties in private endpoint.`);
    
    const statusCounts = {};
    properties.forEach(p => {
      const s = p.status || 'unknown';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });
    console.log("\nStatus Counts:", statusCounts);

    // Si encontramos estados 'sold' o 'closed', imprimir un ejemplo
    const soldProp = properties.find(p => p.status === 'sold' || p.status === 'closed' || p.status === 'rented');
    if (soldProp) {
        console.log("\nExample of a non-active property:");
        console.log(`Title: ${soldProp.title}, Status: ${soldProp.status}`);
    } else {
        console.log("\nNo sold/closed properties found in this account via API.");
    }

  } catch (error) {
    console.error("Fetch Exception:", error);
  }
}

inspectAllProperties();
