import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Validates if the Supabase configuration is usable.
 */
function isConfigured(url?: string, key?: string) {
  return url && url.startsWith('http') && key && key.length > 20;
}

/**
 * Browser client — for use in Client Components
 */
export function createClient() {
  if (!isConfigured(supabaseUrl, supabaseAnonKey)) {
    console.warn('Supabase browser client called without valid configuration. Returning null-proxy.');
    // Return a proxy that logs errors when called to prevent easy-to-miss silent failures
    return new Proxy({} as any, {
      get: () => { throw new Error('Supabase client used before configuration. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY') }
    });
  }
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}

/**
 * Service role client — for server actions and API routes only
 * Has full access, bypasses RLS
 */
export function createServiceClient() {
  if (!isConfigured(supabaseUrl, supabaseServiceKey)) {
    console.warn('Supabase service client called without valid configuration.');
    return new Proxy({} as any, {
      get: () => { throw new Error('Supabase service client used before configuration. Please set SUPABASE_SERVICE_ROLE_KEY') }
    });
  }
  return createSupabaseClient(supabaseUrl!, supabaseServiceKey!);
}
