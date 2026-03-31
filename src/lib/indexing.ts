import { google } from 'googleapis';

/**
 * Servicio para notificar a los buscadores sobre cambios en las URLs de las propiedades.
 */

// Google Indexing API
export async function notifyGoogle(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  try {
    const credsStr = process.env.GOOGLE_INDEXING_CREDENTIALS;
    if (!credsStr) return { success: false, message: 'Faltan credenciales de Google' };

    const credentials = JSON.parse(credsStr);
    
    // CORRECCIÓN: Limpiar saltos de línea en la llave privada si están mal escapados
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth: auth });

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type,
      },
    });

    return { success: true, data: res.data };
  } catch (error: any) {
    console.error('Error notifying Google Indexing API:', error);
    const msg = error.response?.data?.error?.message || error.message || String(error);
    return { success: false, message: msg };
  }
}

// IndexNow (Bing, Yandex, etc.)
export async function notifyIndexNow(url: string) {
  try {
    const key = process.env.INDEXNOW_KEY || 'casaty-indexnow-key';
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

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: `Bing error ${response.status}: ${errorText}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error notifying IndexNow:', error);
    return { success: false, message: error.message || String(error) };
  }
}
