
const URL = "https://app.honectapro.com/api/v1/properties/public?agent_id=46a68490-51ae-40db-b8f7-4ded19c64301";

async function testPublic() {
  try {
    console.log("Fetching from PUBLIC URL (No Auth):", URL);
    const res = await fetch(URL, {
      headers: {
        'Accept': 'application/json'
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

testPublic();
