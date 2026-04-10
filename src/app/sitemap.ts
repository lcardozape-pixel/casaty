import { MetadataRoute } from 'next';
import { getPublicProperties } from '@/lib/honecta';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://casaty.pe';

  // Páginas estáticas principales
  const staticPages = [
    '',
    '/propiedades',
    '/sobre-nosotros',
    '/vender-casa-en-piura',
    '/alquilar-mi-casa-departamento-en-piura',
    '/solicitar-credito-hipotecario-en-piura',
    '/valorizar-mi-inmueble-en-piura',
    '/inmobiliaria-en-piura',
    '/contrato-de-alquiler',
    '/trabaja-con-nosotros',
    '/agente',
    '/propiedades?operacion=venta',
    '/propiedades?operacion=alquiler',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas dinámicas de propiedades
  try {
    const properties = await getPublicProperties();
    const dynamicPages = properties.map((prop) => {
      const isSoldOrRented = prop.status && ['sold', 'rented'].includes(prop.status.toLowerCase());
      
      return {
        url: `${baseUrl}/propiedades/${prop.slug || prop.id}`,
        lastModified: new Date(),
        changeFrequency: (isSoldOrRented ? 'monthly' : 'daily') as any,
        priority: isSoldOrRented ? 0.4 : 0.8,
      };
    });

    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    return staticPages;
  }
}

