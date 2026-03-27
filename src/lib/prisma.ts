import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient | null = null;
let prismaPromise: Promise<PrismaClient> | null = null;

/**
 * Obtiene la instancia de Prisma de forma asíncrona.
 * Esto evita errores de validación durante el build en Hostinger.
 */
export async function getPrisma(): Promise<PrismaClient> {
  if (prismaInstance) return prismaInstance;
  if (prismaPromise) return prismaPromise;

  prismaPromise = (async () => {
    try {
      prismaInstance = new PrismaClient();
      return prismaInstance;
    } catch (error) {
      console.error("Error al inicializar Prisma Client:", error);
      // Fallback a cliente estándar si falla
      prismaInstance = new PrismaClient();
      return prismaInstance;
    }
  })();

  return prismaPromise;
}
