async function testParams() {
  const HONECTA_API_URL = "https://app.honectapro.com/api/v1";
  const HONECTA_AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";

  const paramsToTest = [
    'status=sold',
    'status=closed',
    'status=inactive',
    'include_sold=true',
    'listing_status=sold',
    'all=true'
  ];

  for (const param of paramsToTest) {
    const url = `${HONECTA_API_URL}/properties/public?agent_id=${HONECTA_AGENT_ID}&${param}`;
    console.log(`\nTesting: ${url}`);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const props = Array.isArray(data) ? data : (data.data || []);
        console.log(`Success! Found ${props.length} properties.`);
        if (props.length > 0) {
            console.log(`Example Status: ${props[0].status}`);
        }
      } else {
        console.log(`Failed: ${response.status}`);
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

testParams();
