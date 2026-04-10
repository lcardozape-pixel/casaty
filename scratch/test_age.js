
const HONECTA_API_URL = "https://app.honectapro.com/api/v1";
const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";

async function inspectAPI() {
  try {
    const listUrl = `${HONECTA_API_URL}/properties/public?agent_id=${HONECTA_AGENT_ID}`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();
    const props = listData.data || listData;
    
    if (props && props.length > 0) {
        const p = props.find(p => p.title.includes("San Eduardo"));
        if (p) {
            console.log("Found property:");
            console.log("age:", p.age);
            console.log("property_age:", p.property_age);
            console.log("antiquity:", p.antiquity);
            console.log("features:", p.features);
            console.log("year_built:", p.year_built);
            console.log("Full Keys:", Object.keys(p).join(", "));
        } else {
            console.log("Not found.");
        }
    } else {
        console.log("No properties returned");
    }
  } catch (error) {
    console.error(error);
  }
}

inspectAPI();
