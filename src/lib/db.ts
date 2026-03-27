import mysql from 'mysql2/promise';

/**
 * Conexión ligera a la base de datos usando mysql2.
 * Ideal para entornos con recursos limitados como Hostinger.
 */
let pool: mysql.Pool | null = null;

export async function getDb() {
  if (pool) return pool;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está definida en el entorno.");
  }

  try {
    // Intentar crear el pool desde la URL
    pool = mysql.createPool(url);
    
    // Verificar conexión mínima
    const connection = await pool.getConnection();
    connection.release();
    
    console.log("✅ Conexión a MySQL (mysql2) establecida correctamente.");
    return pool;
  } catch (error) {
    console.error("❌ Error conectando a MySQL con mysql2:", error);
    throw error;
  }
}
