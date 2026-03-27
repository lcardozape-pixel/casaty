import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { formData, serviceName } = await request.json();

    const { name, phone, email, ...otherData } = formData;

    // 1. Guardar en Base de Datos MySQL (Hostinger)
    try {
      const prisma = await getPrisma();
      await prisma.lead.create({
        data: {
          name,
          phone,
          email,
          serviceName,
          details: otherData as any,
        },
      });
      console.log("Lead guardado en base de datos correctamente.");
    } catch (dbError) {
      console.error("Error al guardar lead en base de datos:", dbError);
      // Continuamos con el envío del correo aunque falle la base de datos para no bloquear el lead
    }

    const summaryHtml = Object.entries(otherData)
      .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
      .join('');

    console.log(`Intentando enviar correo para: ${serviceName} a casaty.pe@gmail.com`);

    const { data, error } = await resend.emails.send({
      from: 'Casaty <notificaciones@casaty.pe>',
      to: ['casaty.pe@gmail.com'],
      subject: `Nuevo Lead: ${serviceName} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0040FF;">Nueva Solicitud de ${serviceName}</h2>
          <p>Has recibido un nuevo lead desde el Wizard de Casaty.pe:</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Datos de Contacto</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Detalles de la Solicitud</h3>
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
    return NextResponse.json({ data });
  } catch (err) {
    console.error("Error crítico en API send-lead:", err);
    return NextResponse.json({ error: 'Fallo al enviar el correo', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
