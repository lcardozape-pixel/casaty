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

function deepSearch(obj, target, path = '') {
    if (!obj) return;
    if (typeof obj === 'string') {
        if (obj.toLowerCase().includes(target.toLowerCase())) {
            console.log(`FOUND "${target}" at path: ${path} -> "${obj}"`);
        }
    } else if (Array.isArray(obj)) {
        obj.forEach((val, i) => deepSearch(val, target, `${path}[${i}]`));
    } else if (typeof obj === 'object') {
        Object.keys(obj).forEach(key => deepSearch(obj[key], target, `${path}.${key}`));
    }
}

async function run() {
    try {
        const url = `${API_URL}/properties/public?agent_id=${AGENT_ID}`;
        console.log(`Searching in properties list: ${url}`);
        const data = await get(url);
        const properties = Array.isArray(data) ? data : (data.data || []);
        
        properties.forEach((p, index) => {
            deepSearch(p, "PN-20719", `properties[${index}]`);
            deepSearch(p, "Broker", `properties[${index}]`);
        });

        if (properties[0]) {
            console.log(`\nSearching in individual property ${properties[0].id}...`);
            const indData = await get(`${API_URL}/properties/public/${properties[0].id}`);
            deepSearch(indData, "PN-20719", "individual");
            deepSearch(indData, "Broker", "individual");
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

run();
