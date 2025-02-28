import { metro } from '@hot-updater/metro'
import { supabaseDatabase, supabaseStorage } from '@hot-updater/supabase'
import dotenv from 'dotenv'
import { defineConfig } from 'hot-updater'

dotenv.config({
  path: './.env.production',
})

export default defineConfig({
  build: metro({ enableHermes: true }),
  storage: supabaseStorage({
    supabaseUrl: process.env.HOT_UPDATER_SUPABASE_URL!,
    supabaseAnonKey: process.env.HOT_UPDATER_SUPABASE_ANON_KEY!,
    bucketName: process.env.HOT_UPDATER_SUPABASE_BUCKET_NAME!,
  }),
  database: supabaseDatabase({
    supabaseUrl: process.env.HOT_UPDATER_SUPABASE_URL!,
    supabaseAnonKey: process.env.HOT_UPDATER_SUPABASE_ANON_KEY!,
  }),
})
