import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("CRITICAL: Supabase environment variables are missing!", {
        URL: supabaseUrl ? 'Set' : 'Missing',
        KEY: supabaseAnonKey ? 'Set' : 'Missing'
    });
}

// Export a robust client or a safe fallback to prevent module crashes
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            getSession: async () => ({ data: { session: null }, error: { message: 'Missing Supabase Credentials' } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: async () => ({ error: { message: 'Supabase URL/Key missing in .env.local' } })
        },
        from: () => ({ select: async () => ({ data: [], error: null }) })
    };
