
const { mapHonectaToCasaty } = require('./src/lib/honecta');

const API_URL = "https://app.honectapro.com";
const AGENT_ID = "b47e7049-5981-42df-b76b-958f0cf45f29";
const API_KEY = "hk_live_4wL5nzvtEB7KQrmMzbIQNWaQnBgqemYe";

async function verifyMapping() {
  try {
    const res = await fetch(`${API_URL}/api/properties?agent_id=${AGENT_ID}`, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY
      }
    });
    const data = await res.json();
    const raw = data.data || [];
    
    console.log(`Verifying ${raw.length} properties...`);
    
    const mapped = raw.map(p => {
        try {
            return mapHonectaToCasaty(p);
        } catch (e) {
            return { error: e.message, id: p.id };
        }
    });
    
    mapped.forEach((p, i) => {
        if (p.error) {
            console.log(`[${i}] ERROR:`, p.error);
        } else {
            console.log(`[${i}] ID: ${p.id}, Title: ${p.title}, Price: ${p.price}, Type: ${p.type}, Image: ${p.image.substring(0, 30)}...`);
        }
    });
    
  } catch (e) {
    console.error(e);
  }
}

verifyMapping();
