
const HONECTA_API_URL = "https://app.honectapro.com/api/v1";
const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";

async function inspectAPI() {
  try {
    const listUrl = `${HONECTA_API_URL}/properties/public?agent_id=${HONECTA_AGENT_ID}`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();
    const props = listData.data || listData;
    
    if (props && props.length > 0) {
        console.log("FIRST PROPERTY IN API:");
        const p = props[0];
        console.log("price:", p.price);
        console.log("currency:", p.currency);
        console.log("price_pen:", p.price_pen);
        console.log("price_usd:", p.price_usd);
        console.log("meta:", listData.meta);
        console.log("Full Keys:", Object.keys(p).join(", "));
    } else {
        console.log("No properties returned");
    }
  } catch (error) {
    console.error(error);
  }
}

inspectAPI();
