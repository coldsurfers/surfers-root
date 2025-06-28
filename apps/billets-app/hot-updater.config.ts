import { metro } from '@hot-updater/metro';
import { supabaseDatabase, supabaseStorage } from '@hot-updater/supabase';
import dotenv from 'dotenv';
import { defineConfig } from 'hot-updater';

dotenv.config({
  path: './.env.production',
});

if (!process.env.HOT_UPDATER_SUPABASE_URL) {
  throw new Error('HOT_UPDATER_SUPABASE_URL is not set');
}
if (!process.env.HOT_UPDATER_SUPABASE_ANON_KEY) {
  throw new Error('HOT_UPDATER_SUPABASE_ANON_KEY is not set');
}
if (!process.env.HOT_UPDATER_SUPABASE_BUCKET_NAME) {
  throw new Error('HOT_UPDATER_SUPABASE_BUCKET_NAME is not set');
}

const supabaseUrl = process.env.HOT_UPDATER_SUPABASE_URL as string;
const supabaseAnonKey = process.env.HOT_UPDATER_SUPABASE_ANON_KEY as string;
const supabaseBucketName = process.env.HOT_UPDATER_SUPABASE_BUCKET_NAME as string;

export default defineConfig({
  build: metro({ enableHermes: true }),
  storage: supabaseStorage({
    supabaseUrl,
    supabaseAnonKey,
    bucketName: supabaseBucketName,
  }),
  database: supabaseDatabase({
    supabaseUrl,
    supabaseAnonKey,
  }),
});
