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
  images?: string[];
  label?: string;
  type: "Venta" | "Alquiler";
  propertyType?: string;
  description?: string;
  address?: string;
  city?: string;
  district?: string;
  priceUsd?: string;
}
