export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  priceAmount: number;
  priceAltAmount?: number;
  beds: number;
  baths: number;
  garage: number;
  area: string;
  image: string;
  images?: string[];
  sqft?: number;
  label?: string;
  type: "Venta" | "Alquiler";
  propertyType?: string;
  description?: string;
  address?: string;
  city?: string;
  district?: string;
  priceUsd?: string;
  maintenance?: string;
  subType?: string;
  amenities?: string[];
  age?: string;
  lat?: number;
  lng?: number;
  agent?: {
    name: string;
    photo?: string;
    agency?: string;
    phone?: string;
    email?: string;
    agencyLogo?: string;
    mvcs?: string;
    position?: string;
  };
}
