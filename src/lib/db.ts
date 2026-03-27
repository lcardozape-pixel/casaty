import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export async function getDb() {
  if (pool) return pool;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no definida");
  }

  // Crear pool sin verificar conexión inmediata para no bloquear el arranque
  try {
    pool = mysql.createPool({
      uri: url,
      waitForConnections: true,
      connectionLimit: 1, // Limitar para Hostinger
      queueLimit: 0,
      connectTimeout: 2000 // 2 segundos máximo para conectar
    });
    return pool;
  } catch (error) {
    console.error("Error al crear pool mysql2:", error);
    throw error;
  }
}
