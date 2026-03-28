import { NextResponse } from 'next/server';
import { getPublicProperties } from '@/lib/honecta';

export async function GET() {
  try {
    const properties = await getPublicProperties();
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Proxy Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}
