
const API_URL = "https://app.honectapro.com/api/v1";
const AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";
const API_KEY = "hk_live_4wL5nzvtEB7KQrmMzbIQNWaQnBgqemYe";

async function testV1() {
  try {
    const url = `${API_URL}/properties/public?agent_id=${AGENT_ID}`;
    console.log("Fetching from NEW URL:", url);
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY
      }
    });
    
    console.log("Status:", res.status);
    const data = await res.json();
    const props = data.data || data;
    console.log("Count:", Array.isArray(props) ? props.length : "N/A");
    if (Array.isArray(props) && props.length > 0) {
        console.log("First title:", props[0].title);
    } else {
        console.log("Response body snippet:", JSON.stringify(data).substring(0, 200));
    }
  } catch (e) {
    console.error(e);
  }
}

testV1();
