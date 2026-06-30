import { supabase } from './supabase';

/**
 * Get the current session (browser-side)
 */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Get the current user + profile
 */
export async function getUserWithProfile() {
  const session = await getSession();
  if (!session) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return { user: session.user, profile };
}

/**
 * Sign in with email + password
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

/**
 * Register new user
 */
export async function signUp(email, password, meta) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: meta },
  });
  return { data, error };
}

/**
 * Sign out
 */
export async function signOut() {
  await supabase.auth.signOut();
}

