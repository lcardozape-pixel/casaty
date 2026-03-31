import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { sendLeadToHonecta } from '@/lib/honecta';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);
const HONECTA_AGENT_ID = process.env.NEXT_PUBLIC_HONECTA_AGENT_ID;

export async function POST(request: Request) {
  try {
    const { formData, serviceName } = await request.json();
    const { name, phone, email, propertyUrl, ...otherData } = formData;

    // Generar resumen de datos adicionales
    const summaryHtml = Object.entries(otherData)
      .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
      .join('');

    // Enviar Correo con Resend
    const { data, error } = await resend.emails.send({
      from: 'Casaty <notificaciones@casaty.pe>',
      to: ['casaty.pe@gmail.com'],
      subject: `Nuevo Lead: ${serviceName} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0040FF;">Nueva Solicitud de ${serviceName}</h2>
          <p>Has recibido un nuevo lead desde el detalle de propiedad en Casaty.pe:</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Datos de Contacto</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Detalles de la Propiedad</h3>
            ${propertyUrl ? `
              <div style="margin-bottom: 20px;">
                <a href="${propertyUrl}" style="background-color: #0040FF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Ver Propiedad en la Web
                </a>
              </div>
            ` : ''}
            <ul>
              ${summaryHtml}
            </ul>
          </div>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">Este es un mensaje automático generado por Casaty Lead Wizard.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log("Correo enviado exitosamente:", data?.id);
    
    // 1.5 Guardar Lead en Supabase (Nueva DB)
    try {
      const { error: dbError } = await supabase.from('leads').insert([{
        name,
        phone,
        email,
        service_name: serviceName,
        details: otherData
      }]);
      if (dbError) throw dbError;
      console.log("Lead guardado en Supabase");
    } catch (dbError) {
      console.error("Error guardando lead en Supabase:", dbError);
      // No bloqueamos el flujo principal si falla la base de datos
    }

    // 2. Sincronizar con Honecta (Opcional, no bloquea el éxito del correo)
    try {
      await sendLeadToHonecta({
        name,
        phone,
        email,
        source: "Casaty.pe Website",
        notes: `Solicitud de ${serviceName}. Datos adicionales: ${JSON.stringify(otherData)}`,
        agent_id: HONECTA_AGENT_ID,
        tags: ["website", "casaty", serviceName.toLowerCase()]
      });
      console.log("Sincronización con Honecta exitosa");
    } catch (hError) {
      console.error("Fallo al sincronizar con Honecta:", hError);
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error crítico en API send-lead:", err);
    return NextResponse.json({ 
      error: 'Fallo al enviar el correo', 
      details: err instanceof Error ? err.message : String(err) 
    }, { status: 500 });
  }
}
