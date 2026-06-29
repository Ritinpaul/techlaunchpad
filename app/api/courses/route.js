import { NextResponse } from 'next/server';
import courses from '@/data/courses.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const featured = searchParams.get('featured');

  let result = courses;
  if (slug) result = result.filter(c => c.slug === slug);
  if (featured === 'true') result = result.filter(c => c.isFlagship);

  return NextResponse.json({ data: result });
}
