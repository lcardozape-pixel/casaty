const https = require('https');

const API_URL = "https://app.honectapro.com/api/v1";
const AGENT_ID = "46a68490-51ae-40db-b8f7-4ded19c64301";

function get(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function inspect() {
    try {
        const url = `${API_URL}/properties/public?agent_id=${AGENT_ID}`;
        console.log(`Fetching: ${url}`);
        const data = await get(url);
        
        const properties = Array.isArray(data) ? data : (data.data || []);
        const target = properties[0];
        
        if (target) {
            console.log("\n--- KEYS IN PROPERTY OBJECT ---");
            console.log(Object.keys(target).join(', '));
            
            console.log("\n--- FULL TARGET OBJECT (REDUCED) ---");
            // Eliminar descripción e imágenes largas para no saturar consola
            const reduced = {...target};
            delete reduced.description;
            delete reduced.images;
            console.log(JSON.stringify(reduced, null, 2));
            
            if (target.id) {
                console.log(`\n\n--- FETCHING INDIVIDUAL PROPERTY ${target.id} ---`);
                const indData = await get(`${API_URL}/properties/public/${target.id}`);
                const indProperty = indData.data || indData;
                console.log(JSON.stringify(indProperty.agent || indProperty.user || "Still no agent in individual view", null, 2));
                
                // Buscar logo de agencia en la vista individual
                console.log("\n--- AGENCY INFO INDIVIDUAL ---");
                console.log(JSON.stringify(indProperty.agency || "No agency node", null, 2));
            }
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

inspect();
