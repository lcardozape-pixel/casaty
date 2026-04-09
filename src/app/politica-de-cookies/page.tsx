import { LegalContent } from "@/components/legal/LegalContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Casaty",
  description: "Información detallada sobre el uso de cookies en el sitio web de Inmobiliaria Casaty para mejorar tu experiencia de navegación.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://casaty.pe/politica-de-cookies",
  },
};

const sections = [
  {
    title: "¿Qué son las cookies?",
    content: "Las cookies son pequeños archivos de texto que se almacenan en su navegador cuando visita nuestro sitio web. Estos archivos permiten que el sitio recuerde información sobre su visita, lo que facilita su próxima visita y hace que el sitio sea más útil para usted."
  },
  {
    title: "¿Cómo utilizamos las cookies?",
    content: "Utilizamos cookies para los siguientes fines:\n- **Esenciales**: Necesarias para el funcionamiento básico del sitio.\n- **De Rendimiento**: Para analizar cómo navegan los usuarios y mejorar el sitio.\n- **De Funcionalidad**: Para recordar sus preferencias.\n- **De Publicidad**: Para ofrecer contenido relevante basado en sus intereses."
  },
  {
    title: "¿Cómo puedes controlar las cookies?",
    content: "Usted tiene el control sobre las cookies. La mayoría de los navegadores le permiten:\n- Ver las cookies instaladas y eliminarlas de forma individual.\n- Bloquear cookies de terceros.\n- Bloquear cookies de sitios específicos.\n- Bloquear todas las cookies.\n- Borrar todas las cookies al cerrar el navegador."
  },
  {
    title: "Cookies de terceros",
    content: "En algunos casos, utilizamos cookies proporcionadas por terceros de confianza. Por ejemplo, utilizamos Google Analytics para entender cómo se utiliza nuestro sitio y cómo podemos mejorar su experiencia."
  },
  {
    title: "Cambios en esta Política",
    content: "Podemos actualizar nuestra Política de Cookies periódicamente para reflejar cambios en las cookies que utilizamos o por razones operativas, legales o regulatorias."
  },
  {
    title: "Contacto",
    content: "Si tiene alguna pregunta sobre nuestra política de cookies, puede contactarnos en Av. Bolognesi 349, Oficina 206, Piura, Perú."
  }
];

export default function CookiesPage() {
  return (
    <LegalContent 
      title="Política de Cookies" 
      lastUpdated="24/05/2024"
      sections={sections} 
    />
  );
}


