
const API_URL = "https://app.honectapro.com";
const AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";
const API_KEY = "hk_live_4wL5nzvtEB7KQrmMzbIQNWaQnBgqemYe";

async function testApi() {
  try {
    console.log("Fetching from:", `${API_URL}/api/properties?agent_id=${AGENT_ID}`);
    const res = await fetch(`${API_URL}/api/properties?agent_id=${AGENT_ID}`, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY
      }
    });
    
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data type:", Array.isArray(data) ? "Array" : typeof data);
    console.log("Data Keys:", Object.keys(data));
    if (data.data) console.log("Data.data type:", Array.isArray(data.data) ? "Array" : typeof data.data);
    
    const props = Array.isArray(data) ? data : (data.data || []);
    console.log("Count:", props.length);
    if (props.length > 0) {
        console.log("First Property ID:", props[0].id);
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

testApi();
