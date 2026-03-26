import { LegalContent } from "@/components/legal/LegalContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Casaty",
  description: "Consulta nuestra política de privacidad para saber cómo protegemos tus datos personales en Inmobiliaria Casaty.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://casaty.pe/politica-de-privacidad",
  },
};

const sections = [
  {
    title: "Información que Recopilamos",
    content: "Recopilamos información personal que usted nos proporciona directamente al completar formularios en nuestro sitio, suscribirse a boletines o contactarnos. Esto incluye nombre, correo electrónico y número de teléfono. También recopilamos información automática a través de cookies y herramientas de análisis."
  },
  {
    title: "Uso de la Información",
    content: "Utilizamos la información recopilada para:\n- Atender sus solicitudes de información.\n- Mejorar la experiencia del usuario en nuestro sitio web.\n- Enviar comunicaciones de marketing relacionadas con nuestros servicios (siempre que lo haya autorizado).\n- Cumplir con obligaciones legales y regulatorias."
  },
  {
    title: "Divulgación de la Información",
    content: "No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información con nuestro equipo interno, proveedores de servicios que nos ayudan en la operación del sitio y autoridades legales cuando sea estrictamente necesario."
  },
  {
    title: "Seguridad de la Información",
    content: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso, alteración o destrucción no autorizada. Sin embargo, ninguna transmisión por Internet es 100% segura, por lo que no podemos garantizar seguridad absoluta."
  },
  {
    title: "Tus Derechos",
    content: "Usted tiene derecho a acceder, corregir o eliminar su información personal que poseemos. Para ejercer estos derechos, puede contactarnos a través del correo electrónico de administración especificado en nuestra web."
  },
  {
    title: "Cookies",
    content: "Utilizamos cookies para mejorar la funcionalidad de nuestro sitio y analizar su rendimiento. Puede gestionar sus preferencias de cookies a través de la configuración de su navegador."
  },
  {
    title: "Cambios en esta Política",
    content: "Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le recomendamos revisarla periódicamente para estar informado sobre cómo protegemos sus datos."
  },
  {
    title: "Contacto",
    content: "Si tiene preguntas sobre esta política, puede encontrarnos en la Av. Bolognesi 349, Oficina 206, Piura, Perú."
  }
];

export default function PrivacidadPage() {
  return (
    <LegalContent 
      title="Política de Privacidad" 
      lastUpdated="24/05/2024"
      sections={sections} 
    />
  );
}
