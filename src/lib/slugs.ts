/**
 * Utilidad para generar URLs amigables (slugs) optimizadas para SEO.
 * Elimina palabras vacías (stop words), acentos y caracteres especiales.
 */

const STOP_WORDS = new Set([
  'de', 'del', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 
  'y', 'e', 'o', 'u', 'en', 'con', 'para', 'por', 'a', 'al', 'que', 'en'
]);

/**
 * Limpia un texto para ser usado en una URL (slug).
 */
export function slugify(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase()
    .normalize("NFD") // Descompone caracteres con acento
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales excepto espacios y guiones
    .trim()
    .split(/\s+/) // Separa por espacios
    .filter(word => word.length > 0 && !STOP_WORDS.has(word)) // Quita espacios vacíos y stop words
    .join("-") // Une con guiones medios
    .replace(/-+/g, "-"); // Evita guiones dobles
}

/**
 * Genera el ID híbrido optimizado para SEO: ID-slug
 */
export function generatePropertySlug(id: string, title: string): string {
  const slug = slugify(title);
  return slug ? `${id}-${slug}` : id;
}

/**
 * Extrae el ID real de un slug híbrido.
 * Soporta formatos: "UUID" o "UUID-nombre-amigable"
 */
export function extractIdFromSlug(slug: string): string {
  if (!slug) return "";
  
  // El ID real es lo que esté antes del primer guion que separe el UUID del slug.
  // Pero ojo: los UUID ya contienen guiones (ej: 29a63a6d-fdb9-4b5e-b4b4-2bd5cbd0edc6).
  // Por lo tanto, si el slug tiene más de 5 bloques (formato estándar de UUID),
  // el ID es la combinación de los primeros 5 bloques.
  
  const parts = slug.split("-");
  
  // Un UUID v4 estándar tiene 5 bloques separados por guiones
  if (parts.length >= 5) {
    return parts.slice(0, 5).join("-");
  }
  
  return parts[0]; // Fallback para IDs cortos o no UUID
}
