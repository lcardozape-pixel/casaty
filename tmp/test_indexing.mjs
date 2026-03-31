import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testGoogle() {
  try {
    const url = 'https://casaty.pe/propiedades/4af3bfb0-9212-43cf-a2b8-755ae2c070f5';
    console.log('Testing Google Indexing with URL:', url);
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_INDEXING_CREDENTIALS || '{}'),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth: auth });
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });
    console.log('Google Success:', res.data);
  } catch (error) {
    console.error('Google Error:', error.response?.data || error.message);
  }
}

async function testBing() {
  try {
    const url = 'https://casaty.pe/propiedades/4af3bfb0-9212-43cf-a2b8-755ae2c070f5';
    const key = process.env.INDEXNOW_KEY || 'casaty_indexnow_default_key';
    const host = 'casaty.pe';
    
    console.log('Testing Bing IndexNow with URL:', url);
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: host,
        key: key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList: [url],
      }),
    });

    console.log('Bing Status:', response.status);
    if (!response.ok) {
      console.log('Bing Error Body:', await response.text());
    }
  } catch (error) {
    console.error('Bing Error:', error.message);
  }
}

testGoogle().then(() => testBing());
