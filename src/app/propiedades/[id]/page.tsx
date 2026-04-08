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
  
  const similarProperties = allProps
    .filter(p => p.id !== property.id)
    .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        
        if (a.propertyType === property.propertyType) scoreA += 2;
        if (b.propertyType === property.propertyType) scoreB += 2;
        
        if (a.district === property.district) scoreA += 1;
        if (b.district === property.district) scoreB += 1;
        
        return scoreB - scoreA;
    })
    .slice(0, 2);

  return (
    <PropertyClient 
      property={property} 
      similarProperties={similarProperties} 
    />
  );
}
