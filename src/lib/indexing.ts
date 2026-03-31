import { google } from 'googleapis';

/**
 * Servicio para notificar a los buscadores sobre cambios en las URLs de las propiedades.
 */

// Google Indexing API
export async function notifyGoogle(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_INDEXING_CREDENTIALS || '{}'),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth: auth });

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error notoring Google Indexing API:', error);
    return null;
  }
}

// IndexNow (Bing, Yandex, etc.)
export async function notifyIndexNow(url: string) {
  try {
    const key = process.env.INDEXNOW_KEY || 'casaty_indexnow_default_key';
    const host = 'casaty.pe'; // Ajustar según el dominio real
    
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

    return response.ok;
  } catch (error) {
    console.error('Error notifying IndexNow:', error);
    return false;
  }
}
