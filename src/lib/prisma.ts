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
        const adapterFactory = new PrismaMariaDb(url);
        const adapter = await adapterFactory.connect();
        // Usamos 'as any' para evitar el error de tipado estricto en el build de Hostinger
        // donde el compilador espera un objeto con 'connect' (Factory) en lugar del adaptador ya conectado.
        prismaInstance = new PrismaClient({ adapter: adapter as any });
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
