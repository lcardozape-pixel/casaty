import fetch from 'node-fetch';

async function testSync() {
  try {
    const response = await fetch('http://localhost:3000/api/indexing/sync');
    const data = await response.json();
    console.log('Sync result:', data);
  } catch (error) {
    console.error('Error during sync test:', error);
  }
}

// Nota: Esto solo funcionaría si el servidor estuviera corriendo localmente.
// Como no estoy seguro de si el servidor está arriba, solo dejo el script como referencia.
// testSync();
