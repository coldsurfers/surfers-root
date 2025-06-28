import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import type { Database } from '../schema/supabase.ts';
import { dataApiKey, dataApiUrl } from './env.ts';

export const supabase = createClient<Database>(dataApiUrl, dataApiKey, {
  auth: { autoRefreshToken: true, persistSession: false },
});
