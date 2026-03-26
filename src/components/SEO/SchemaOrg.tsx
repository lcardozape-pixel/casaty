import React from 'react';

export const SchemaOrg = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Casaty",
    "description": "Inmobiliaria líder en Piura especializada en la venta, alquiler y tasación de casas, departamentos y terrenos.",
    "url": "https://casaty.pe",
    "logo": "https://casaty.pe/Logo/logo-principal.webp",
    "image": "https://casaty.pe/Logo/logo-principal.webp",
    "telephone": "+51941849523",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Bolognesi 349",
      "addressLocality": "Piura",
      "addressRegion": "Piura",
      "postalCode": "20001",
      "addressCountry": "PE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -5.2002976,
      "longitude": -80.6278677
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -5.2002976,
        "longitude": -80.6278677
      },
      "geoRadius": "50000"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
