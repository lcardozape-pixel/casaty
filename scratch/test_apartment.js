
const HONECTA_API_URL = "https://app.honectapro.com/api/v1";
const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";

async function inspectAPI() {
  try {
    const listUrl = `${HONECTA_API_URL}/properties/public?agent_id=${HONECTA_AGENT_ID}`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();
    const props = listData.data || listData;
    
    if (props && props.length > 0) {
        const p = props.find(p => p.title.includes("Departamento") && p.title.includes("Piura"));
        if (p) {
            console.log("Found property:");
            console.log("age:", p.age, "antiquity", p.antiquity, "property_age", p.property_age);
            console.log("features:", p.features);
            console.log("has_elevator:", p.has_elevator);
            console.log("floor/floors:", p.floor, p.floors, p.floor_number, p.floor_num);
            console.log("total_area:", p.total_area);
            console.log("built_area:", p.built_area);
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
