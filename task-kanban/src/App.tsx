import { isSupabaseConfigured } from '@/lib/supabase'
import { AuthGate } from '@/components/auth/AuthGate'
import { Board } from '@/components/board/Board'

function App() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-4 text-center">
        <p className="text-sm font-medium">環境変数が未設定です</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          .env に VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY を設定してください。
        </p>
      </div>
    )
  }

  return (
    <AuthGate>
      <Board />
    </AuthGate>
  )
}

export default App
