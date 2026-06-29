import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, program, groupSize, source, message } = body;

    // Validate required
    if (!name || !phone || !program) {
      return NextResponse.json({ error: 'Missing required fields: name, phone, program' }, { status: 400 });
    }

    // Store lead in Supabase
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone.trim(),
        program: program.trim(),
        source: source || 'enrollment_form',
        message: message ? JSON.stringify({ groupSize, ...JSON.parse(message || '{}') }) : JSON.stringify({ groupSize }),
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase lead insert error:', error);
      // Still return success — don't block the user
    }

    return NextResponse.json({
      success: true,
      message: 'Enrollment lead captured. Our team will contact you within 4 hours.',
      id: data?.id || null,
    });

  } catch (err) {
    console.error('Enrollment API error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
