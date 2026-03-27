import { PrismaClient } from '@prisma/client';

/**
 * MOCK DE PRISMA PARA DIAGNÓSTICO DE RENDIMIENTO.
 * Desactivamos la conexión real para ver si el sitio recupera la velocidad en Hostinger.
 */
export async function getPrisma(): Promise<any> {
  console.log("⚠️ MODO DIAGNÓSTICO: Prisma está desactivado para restaurar el sitio.");
  
  // Devolvemos un objeto mock que no hace nada para no romper el API
  return {
    lead: {
      create: async () => {
        console.log("MOCK: Lead no guardado (Prisma off)");
        return { id: 0 };
      }
    },
    $disconnect: async () => {},
    $connect: async () => {}
  };
}
