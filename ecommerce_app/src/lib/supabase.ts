import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: {
      schema: 'public',
    },
    global: {
      headers: { 'X-Client-Info': 'your-app-name' }
    },
    auth: {
      persistSession: false,
      detectSessionInUrl: false
    },
    // Enable error details
    realtime: {
      logLevel: 'debug'
    }
  });
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    db: {
      schema: 'public',
    },
    global: {
      headers: { 'X-Client-Info': 'your-app-name' }
    },
    auth: {
      persistSession: false,
      detectSessionInUrl: false
    },
    // Enable error details
    realtime: {
      logLevel: 'debug'
    }
  })
