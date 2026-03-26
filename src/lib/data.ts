export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  garage: number;
  area: string;
  image: string;
  label?: string;
  type: "Venta" | "Alquiler";
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Vendo Casa en Urb. Sol de Piura",
    location: "Piura",
    price: "S/290,000.00",
    beds: 5,
    baths: 3,
    garage: 1,
    area: "194.59 m²",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Venta",
  },
  {
    id: "2",
    title: "Modulo en venta en La Rinconada",
    location: "Piura",
    price: "S/95,000.00",
    beds: 1,
    baths: 1,
    garage: 1,
    area: "35 m²",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Venta",
  },
  {
    id: "3",
    title: "Venta de Modulo en Santa Margarita",
    location: "Piura",
    price: "S/160,000.00",
    beds: 2,
    baths: 1,
    garage: 1,
    area: "35 m²",
    image: "https://images.unsplash.com/photo-1448630360428-65ff2c0ca3fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Venta",
  },
  {
    id: "4",
    title: "Venta de Casa en centro de Piura",
    location: "Piura",
    price: "$820,000.00",
    beds: 6,
    baths: 5,
    garage: 3,
    area: "300 m²",
    image: "https://images.unsplash.com/photo-1512918766671-ed6a07be3573?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Venta",
    label: "DESTACADA",
  },
  {
    id: "5",
    title: "Alquiler de Oficinas cerca al centro",
    location: "Piura",
    price: "S/1,200.00/mes",
    beds: 0,
    baths: 2,
    garage: 0,
    area: "60 m²",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Alquiler",
  },
  {
    id: "6",
    title: "Departamento en Alquiler cerca de UDEP",
    location: "Piura",
    price: "S/1,600.00/mes",
    beds: 3,
    baths: 2,
    garage: 1,
    area: "110 m²",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Alquiler",
  },
];
