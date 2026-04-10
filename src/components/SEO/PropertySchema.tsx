import React from 'react';
import { Property } from '@/lib/types';

interface PropertySchemaProps {
  property: Property;
}

export const PropertySchema = ({ property }: PropertySchemaProps) => {
  const baseUrl = 'https://casaty.pe';
  const url = `${baseUrl}/propiedades/${property.slug || property.id}`;
  
  // Determinar el tipo de esquema más específico
  const getSchemaType = (type?: string) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('casa')) return 'House';
    if (t.includes('depa') || t.includes('departamento')) return 'Apartment';
    return 'Accommodation';
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description?.slice(0, 300),
    "url": url,
    "image": property.image || property.images?.[0] || "",
    "datePosted": new Date().toISOString(), // Idealmente vendría de la API
    "mainEntity": {
      "@type": getSchemaType(property.propertyType),
      "name": property.title,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": property.address || "",
        "addressLocality": property.district || "",
        "addressRegion": property.city || "Piura",
        "addressCountry": "PE"
      },
      "numberOfRooms": property.beds || 0,
      "numberOfBathroomsTotal": property.baths || 0,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.sqft || property.area.split(' ')[0] || 0,
        "unitCode": "MTK" // Metros cuadrados
      },
      "geo": property.lat && property.lng ? {
        "@type": "GeoCoordinates",
        "latitude": property.lat,
        "longitude": property.lng
      } : undefined
    },
    "offers": {
      "@type": "Offer",
      "price": property.priceAmount,
      "priceCurrency": property.price.includes('S/') ? "PEN" : "USD",
      "availability": "https://schema.org/InStock",
      "url": url,
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Casaty",
        "url": baseUrl
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
