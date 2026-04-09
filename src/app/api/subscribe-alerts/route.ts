import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { firstName, email, searchIntent, propertyTypes, locations } = await request.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Nombre y correo son obligatorios' }, { status: 400 });
    }

    // 1. Enviar notificación por correo
    try {
      await resend.emails.send({
        from: 'Casaty Alertas <notificaciones@casaty.pe>',
        to: ['casaty.pe@gmail.com'],
        subject: `Nueva Suscripción a Alertas: ${firstName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #0040FF;">Nueva Suscripción a Alertas</h2>
            <p>Un usuario se ha suscrito para recibir notificaciones de nuevas propiedades:</p>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nombre:</strong> ${firstName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Intención:</strong> ${searchIntent.toUpperCase()}</p>
              <p><strong>Tipos de Inmueble:</strong> ${propertyTypes.join(', ')}</p>
              <p><strong>Ubicaciones:</strong> ${locations.join(', ')}</p>
            </div>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">Sistema de Alertas Automáticas - Casaty.pe</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error enviando correo de suscripción:", emailError);
      // No bloqueamos el proceso si falla el correo
    }

    // 2. Guardar en Supabase
    const { error: dbError } = await supabase.from('property_alerts').insert([{
      first_name: firstName,
      email,
      search_intent: searchIntent,
      property_types: propertyTypes,
      locations: locations
    }]);

    if (dbError) {
      console.error("Error guardando suscripción en Supabase:", dbError);
      return NextResponse.json({ error: 'Error al procesar la suscripción en la base de datos' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error crítico en API subscribe-alerts:", err);
    return NextResponse.json({ 
      error: 'Error interno del servidor', 
      details: err instanceof Error ? err.message : String(err) 
    }, { status: 500 });
  }
}
