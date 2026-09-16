import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

// 環境変数が未設定の場合はダミー値でクライアントを作らず null にする。
// 呼び出し側（App.tsx）が isSupabaseConfigured を見て未設定画面を出すので、
// 設定済みの場合しか使われない前提で non-null として扱ってよい。
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null
