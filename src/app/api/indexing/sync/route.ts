import { NextRequest, NextResponse } from 'next/server';
import { getPublicProperties } from '@/lib/honecta';
import { supabase } from '@/lib/supabase';
import { notifyGoogle, notifyIndexNow } from '@/lib/indexing';

export async function GET(request: NextRequest) {
  try {
    // Seguridad: Verificar CRON_SECRET si está configurado en Vercel
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const baseUrl = 'https://casaty.pe';

    // 1. Obtener propiedades actuales de Honecta
    const properties = await getPublicProperties();
    const currentIds = properties.map(p => p.id);

    if (currentIds.length === 0) {
      return NextResponse.json({ message: 'No properties found in Honecta' });
    }

    // 2. Obtener lo que ya está indexado en Supabase
    const { data: alreadyIndexed, error: dbError } = await supabase
      .from('indexed_properties')
      .select('honecta_id');

    if (dbError) throw dbError;

    const indexedIds = new Set(alreadyIndexed?.map(p => p.honecta_id) || []);

    // 3. Filtrar propiedades que faltan por indexar
    const toIndex = properties.filter(p => !indexedIds.has(p.id));

    if (toIndex.length === 0) {
      return NextResponse.json({ message: 'All properties are already indexed' });
    }

    const results = [];

    // 4. Procesar la indexación
    for (const prop of toIndex) {
      const url = `${baseUrl}/propiedades/${prop.id}`;
      
      console.log(`Indexando propiedad: ${prop.id} -> ${url}`);
      
      const googleRes = await notifyGoogle(url);
      const bingRes = await notifyIndexNow(url);

      // Guardar rastro en Supabase una vez notificado
      const { error: insError } = await supabase.from('indexed_properties').insert([{
        honecta_id: prop.id,
        url: url
      }]);

      results.push({
        id: prop.id,
        google: googleRes.success ? 'Success' : `Failed: ${googleRes.message}`,
        bing: bingRes.success ? 'Success' : `Failed: ${bingRes.message}`,
        dbSaved: insError ? 'Error' : 'OK'
      });
    }

    return NextResponse.json({
      processedCount: results.length,
      details: results
    });

  } catch (error) {
    console.error('Error in Indexing Sync:', error);
    return NextResponse.json({ 
      error: 'Failed to sync indexing', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
