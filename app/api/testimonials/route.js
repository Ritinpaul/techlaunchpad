import { NextResponse } from 'next/server';
import testimonials from '@/data/testimonials.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const domain = searchParams.get('domain');
  const limit = parseInt(searchParams.get('limit') || '0');

  let result = testimonials;
  if (featured === 'true') result = result.filter(t => t.isFeatured);
  if (domain) result = result.filter(t => t.domain === domain);
  if (limit > 0) result = result.slice(0, limit);

  return NextResponse.json({ data: result, total: testimonials.length });
}
