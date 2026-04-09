import { MetadataRoute } from 'next';
import { getPublicProperties } from '@/lib/honecta';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://casaty.pe';

  // Páginas estáticas principales
  const staticPages = [
    '',
    '/propiedades',
    '/sobre-nosotros',
    '/contacto',
    '/vender-casa-en-piura',
    '/alquilar-mi-casa-departamento-en-piura',
    '/solicitar-credito-hipotecario-en-piura',
    '/valorizar-mi-inmueble-en-piura',
    '/inmobiliaria-en-piura',
    '/contrato-de-alquiler',
    '/trabaja-con-nosotros',
    '/agente',
    '/propiedades/venta',
    '/propiedades/alquiler',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas dinámicas de propiedades
  try {
    const properties = await getPublicProperties();
    const dynamicPages = properties.map((prop) => ({
      url: `${baseUrl}/propiedades/${prop.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    return staticPages;
  }
}

