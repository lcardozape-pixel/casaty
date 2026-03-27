import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

let prismaInstance: PrismaClient | null = null;
let prismaPromise: Promise<PrismaClient> | null = null;

/**
 * Obtiene la instancia de Prisma de forma asíncrona.
 * Esto evita errores de validación durante el build en Hostinger
 * y permite el uso correcto del Driver Adapter de MariaDB.
 */
export async function getPrisma(): Promise<PrismaClient> {
  if (prismaInstance) return prismaInstance;
  if (prismaPromise) return prismaPromise;

  prismaPromise = (async () => {
    try {
      const url = process.env.DATABASE_URL;
      
      if (url && (url.startsWith('mysql://') || url.startsWith('mariadb://'))) {
        // En Prisma 7, PrismaMariaDb es una factory que devuelve el adaptador
        const adapterFactory = new PrismaMariaDb(url);
        const adapter = await adapterFactory.connect();
        prismaInstance = new PrismaClient({ adapter });
      } else {
        prismaInstance = new PrismaClient();
      }
      return prismaInstance;
    } catch (error) {
      console.error("Error al inicializar Prisma Client:", error);
      // Fallback a cliente estándar si falla el adaptador
      prismaInstance = new PrismaClient();
      return prismaInstance;
    }
  })();

  return prismaPromise;
}
