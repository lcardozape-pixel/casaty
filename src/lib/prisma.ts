import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

let prismaInstance: PrismaClient | null = null;
let prismaPromise: Promise<PrismaClient> | null = null;

/**
 * Obtiene la instancia de Prisma de forma asíncrona.
 */
export async function getPrisma(): Promise<PrismaClient> {
  if (prismaInstance) return prismaInstance;
  if (prismaPromise) return prismaPromise;

  prismaPromise = (async () => {
    try {
      const url = process.env.DATABASE_URL;
      
      if (url && (url.startsWith('mysql://') || url.startsWith('mariadb://'))) {
        const adapterFactory = new PrismaMariaDb(url);
        const adapter = await adapterFactory.connect();
        prismaInstance = new PrismaClient({ adapter: adapter as any });
      } else {
        prismaInstance = new PrismaClient();
      }
      return prismaInstance;
    } catch (error) {
      console.error("Error al inicializar Prisma Client:", error);
      prismaInstance = new PrismaClient();
      return prismaInstance;
    }
  })();

  return prismaPromise;
}
