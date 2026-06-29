import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Only /dashboard routes require authentication.
// /mocks/* are free public content — no login needed.
const PROTECTED = ['/dashboard'];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some(path => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  // MOCK AUTH: Always allow access to dashboard for the hackathon
  return NextResponse.next();

  // Read Supabase session from cookies
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        detectSessionInUrl: false,
        persistSession: false,
      },
      global: {
        headers: { cookie: request.headers.get('cookie') || '' },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

