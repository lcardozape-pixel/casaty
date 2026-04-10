import { Metadata, ResolvingMetadata } from "next";
import { getHonectaPropertyById, getPublicProperties } from "@/lib/honecta";
import { notFound } from "next/navigation";
import PropertyClient from "@/components/features/PropertyClient";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Genera los metadatos dinámicos para el SEO de cada propiedad.
 * Esto corrige el problema de indexación al proporcionar títulos y descripciones únicos.
 */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const property = await getHonectaPropertyById(id);

  if (!property) {
    return {
      title: "Propiedad no encontrada | Casaty",
    };
  }

  const title = `${property.propertyType} en ${property.type} en ${property.district || property.location} - ${property.title} | Casaty`;
  const description = property.description?.slice(0, 160) || `Increíble ${property.propertyType} en ${property.type} en ${property.location}. Contáctanos para más detalles.`;
  const url = `https://casaty.pe/propiedades/${id}`;
  const imageUrl = property.image || "https://casaty.pe/Logo/logo-principal.webp";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Casaty",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      locale: "es_PE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id: propertyId } = await params;
  
  // Obtener datos de la propiedad en el servidor
  const property = await getHonectaPropertyById(propertyId);
  
  if (!property) {
    notFound();
  }

  // Obtener todas las propiedades para buscar similares en el servidor
  const allProps = await getPublicProperties();
  
  // Asignar un puntaje a las propiedades del mismo tipo de operación (Alquiler con Alquiler, Venta con Venta)
  const similarWithScores = allProps
    .filter(p => p.id !== property.id && p.type === property.type)
    .map(p => {
        let score = 0;
        
        // 1. Tipo de Inmueble (Departamento / Casa) - Prioridad ALTA y Obligatoria (+5 pts)
        if (p.propertyType === property.propertyType) score += 5;
        
        // 2. Distrito (Ubicación exacta) - Prioridad MEDIA (+2 pts)
        if (p.district && p.district === property.district) score += 2;

        // 3. Ciudad (Ubicación general) - Prioridad BAJA (+1 pt)
        if (p.city && p.city === property.city) score += 1;
        
        return { property: p, score };
    });

  // Solo mostrar las que tengan un puntaje >= 5 (Es decir, que OBLIGATORIAMENTE sean del mismo tipo de inmueble)
  const similarProperties = similarWithScores
    .filter(item => item.score >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(item => item.property);

  return (
    <PropertyClient 
      property={property} 
      similarProperties={similarProperties} 
    />
  );
}


