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
/** @type {any} */
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            getSession: async () => ({ data: { session: null }, error: { message: 'Missing Supabase Credentials' } }),
            setSession: async () => ({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: async () => ({ error: { message: 'Supabase URL/Key missing in .env.local' } }),
            signOut: async () => ({ error: null }),
        },
        from: () => {
            // Create a real Promise that resolves to empty data
            const promise = Promise.resolve({ data: [], error: null });

            // Attach chainable methods to the Promise instance itself
            promise.url = new URL('http://localhost');
            promise.headers = {};
            promise.select = () => promise;
            promise.eq = () => promise;
            promise.gte = () => promise;
            promise.lte = () => promise;
            promise.order = () => promise;
            promise.limit = () => promise;
            promise.range = () => promise;
            promise.single = async () => ({ data: null, error: null });

            return promise;
        }
    };
