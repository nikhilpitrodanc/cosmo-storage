import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are provided
export const isSupabaseConfigured = !!(supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY');

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Self-executing connection test
if (isSupabaseConfigured) {
  supabase.from('files').select('count', { count: 'exact', head: true })
    .then(({ error }) => {
      if (error) {
        console.error('🚀 [Cosmo-Supabase] Connection Error:', error.message);
      } else {
        console.log('🚀 [Cosmo-Supabase] Connection Established Successfully!');
      }
    });
} else {
  console.warn('⚠️ [Cosmo-Supabase] Supabase is NOT configured. Running in simulation mode.');
}

/**
 * Sign Up with Email and Password
 */
export const signUp = async (email, password) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

/**
 * Sign In with Email and Password
 */
export const signInWithPassword = async (email, password) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

/**
 * Helper to verify OTP (used during signup confirmation)
 */
export const verifyOtp = async (email, token) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  });
  return { data, error };
};
