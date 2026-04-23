import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Debug: Log environment variables status
console.log('Supabase URL available:', !!supabaseUrl)
console.log('Supabase Key available:', !!supabaseAnonKey)
console.log('Build mode:', import.meta.env.MODE)
console.log('All VITE_ env vars:', {
  url: supabaseUrl ? 'SET' : 'MISSING',
  key: supabaseAnonKey ? 'SET' : 'MISSING'
})

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = `Missing Supabase environment variables!
  
Required environment variables not found:
- VITE_SUPABASE_URL: ${supabaseUrl ? 'SET' : 'MISSING'}
- VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'SET' : 'MISSING'}

CLOUDFLARE PAGES USERS:
1. Go to Cloudflare Dashboard
2. Pages → Your Project → Settings
3. Find "Environment variables" section
4. Add these for PRODUCTION:
   - VITE_SUPABASE_URL: https://mqdygismuzqsmikaoutc.supabase.co
   - VITE_SUPABASE_ANON_KEY: [your-key-here]
5. Click SAVE
6. Go to Deployments → Retry latest deployment

LOCAL DEVELOPMENT USERS:
1. Create or update .env.local file
2. Add your Supabase credentials
3. Run: npm run dev`
  
  throw new Error(errorMsg)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
