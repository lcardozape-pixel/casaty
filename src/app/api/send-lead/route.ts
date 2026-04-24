import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { sendLeadToHonecta, scheduleVisitToHonecta } from '@/lib/honecta';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

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
          <h2 style="color: #0127AC;">Nueva Solicitud de ${serviceName}</h2>
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
                <a href="${propertyUrl}" style="background-color: #0127AC; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
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
    let dbSaved = false;
    let dbErrorDetail = null;

    try {
      const { error: dbError } = await supabase.from('leads').insert([{
        name,
        phone,
        email,
        service_name: serviceName,
        details: otherData
      }]);
      
      if (dbError) {
        dbErrorDetail = dbError.message;
        console.error("Error guardando lead en Supabase:", dbError);
      } else {
        dbSaved = true;
        console.log("Lead guardado en Supabase");
      }
    } catch (dbError: any) {
      dbErrorDetail = dbError.message || String(dbError);
      console.error("Error crítico guardando lead en Supabase:", dbError);
    }

    // 2. Sincronizar con Honecta (Opcional, no bloquea el éxito del correo)
    try {
      // Formatear notas para que sean legibles en el CRM
      const visitNotes = serviceName === 'Reserva de Visita' 
        ? `📅 SOLICITUD DE VISITA\n-------------------\nFECHA: ${formData['Fecha de Visita'] || 'No especificada'}\nHORA: ${formData['Hora de Visita'] || 'No especificada'}\nPROPIEDAD: ${formData.propertyTitle || 'No especificada'}\n-------------------\n\n`
        : "";
      
      const otherDataText = Object.entries(otherData)
        .filter(([key]) => !['visitDateISO', 'visitTimeRaw', 'Fecha de Visita', 'Hora de Visita', 'Visita Solicitada'].includes(key))
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      const fullNotes = `${visitNotes}Origen: Casaty.pe\n${otherDataText}`;

      // Siempre enviar como Lead y capturar el ID para vincular la cita
      const leadResult = await sendLeadToHonecta({
        name,
        phone,
        email,
        source: "API Pública",
        notes: fullNotes,
        agent_id: HONECTA_AGENT_ID,
        property_id: formData.propertyId,
        tags: ["website", "casaty", serviceName.toLowerCase().replace(/\s+/g, '_')]
      });

      const leadId = leadResult?.id || leadResult?.data?.id;
      if (leadId) {
        console.log("Lead sincronizado con ID:", leadId);
      }

      // Si es una reserva de visita, intentar registrar en el calendario VINCULADO al lead
      if (serviceName === 'Reserva de Visita' && formData.visitDateISO && formData.visitTimeRaw) {
        // Extraer la hora de inicio del rango (ej: "04:00 - 05:00 PM" -> "16:00")
        const timeRaw = formData.visitTimeRaw || "";
        const isPM = timeRaw.includes('PM');
        const startTimeStr = timeRaw.split(' - ')[0]; // "04:00"
        let [h, m] = startTimeStr.split(':').map(Number);
        if (isPM && h !== 12) h += 12;
        if (!isPM && h === 12) h = 0;
        const formattedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

        const visitResult = await scheduleVisitToHonecta({
          name,
          phone,
          email,
          lead_id: leadId, // Vínculo crucial para que aparezca en el Deal
          property_id: formData.propertyId,
          date: formData.visitDateISO,
          time: formattedTime,
          notes: `Visita solicitada desde Casaty.pe. Propiedad: ${formData.propertyTitle}`,
          agent_id: HONECTA_AGENT_ID
        });

        if (visitResult.success) {
          console.log("Visita registrada en el calendario de Honecta");
        } else {
          console.error("No se pudo registrar la visita en el calendario:", visitResult.error);
          
          // Loguear error detallado a un archivo para que el usuario pueda revisarlo
          try {
            const logMsg = `[${new Date().toISOString()}] ERROR HONECTA CALENDAR: Status: ${visitResult.status} | Error: ${visitResult.error} | Payload: ${JSON.stringify({
              date: formData.visitDateISO,
              time: formattedTime,
              propertyId: formData.propertyId
            })}\n`;
            fs.appendFileSync(path.join(process.cwd(), 'honecta_errors.log'), logMsg);
          } catch (e) {}

          if (visitResult.status === 403 || visitResult.status === 404) {
             console.warn("AVISO: La API de Honecta no tiene habilitado o no tiene permisos para el endpoint de calendario.");
          }
        }
      }
    } catch (hError) {
      console.error("Fallo al sincronizar con Honecta:", hError);
    }

    return NextResponse.json({ 
      success: true, 
      data, 
      dbSaved, 
      dbErrorDetail 
    });
  } catch (err: any) {
    console.error("Error crítico en API send-lead:", err);
    // Loguear a un archivo para diagnóstico (opcional)
    const errorDetails = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ 
      error: 'Fallo al enviar el correo', 
      details: errorDetails 
    }, { status: 500 });
  }
}

