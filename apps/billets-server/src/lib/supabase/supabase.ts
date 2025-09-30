import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import type { Database } from '../types/supabase-schema';

dotenv.config();

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '' // 서버에서 실행 → anon key 대신 service key 권장
);
