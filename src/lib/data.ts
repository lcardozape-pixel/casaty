export type { Property } from "./types";
import type { Property } from "./types";

/**
 * Retorna las propiedades de Honecta a través de un proxy interno (para evitar CORS).
 * Solo se llama desde el cliente. El server-side usa getPublicProperties directamente.
 */
export async function getProperties(): Promise<Property[]> {
  try {
    if (typeof window !== 'undefined') {
      // Cliente: usar proxy API para evitar CORS
      console.log("getProperties: Fetching from internal Proxy...");
      const response = await fetch('/api/properties');
      
      if (response.ok) {
        const dynamicProperties = await response.json();
        if (Array.isArray(dynamicProperties) && dynamicProperties.length > 0) {
          console.log("getProperties: DYNAMIC load via PROXY SUCCESS");
          return dynamicProperties;
        }
      }
      console.warn("getProperties: Proxy fetch returned no results or failed");
    } else {
      // Server-side: importar dinámicamente para evitar circular
      const { getPublicProperties } = await import("./honecta");
      console.log("getProperties: Server-side direct fetch...");
      const props = await getPublicProperties();
      if (props.length > 0) return props;
    }
  } catch (error) {
    console.error("getProperties: Error:", error);
  }

  return [];
}
