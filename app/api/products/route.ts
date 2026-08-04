import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PRODUCTS as FALLBACK_PRODUCTS } from '@/lib/config';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  try {
    const whereClause: any = {};

    if (category && category !== 'semua') {
      whereClause.category = category;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' },
    });

    if (products.length > 0) {
      return NextResponse.json({ success: true, data: products, source: 'mysql' });
    }

    // Fallback to static catalog if DB is empty or unpopulated
    let filteredFallback = FALLBACK_PRODUCTS;
    if (category && category !== 'semua') {
      filteredFallback = filteredFallback.filter(p => p.category === category);
    }
    if (search) {
      filteredFallback = filteredFallback.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({ success: true, data: filteredFallback, source: 'config' });
  } catch (error) {
    console.error('MySQL products fetch error, returning fallback data', error);
    return NextResponse.json({ success: true, data: FALLBACK_PRODUCTS, source: 'fallback' });
  }
}
