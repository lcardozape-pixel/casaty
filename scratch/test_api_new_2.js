
const HONECTA_API_URL = "https://app.honectapro.com/api/v1";
const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";

async function inspectAPI() {
  try {
    const listUrl = `${HONECTA_API_URL}/properties/public?agent_id=${HONECTA_AGENT_ID}`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();
    console.log(JSON.stringify(listData, null, 2).substring(0, 500));
  } catch (error) {
    console.error(error);
  }
}

inspectAPI();
