import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { LoginForm } from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/button'

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, loading, signOut } = useAuth()
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const userId = session?.user.id

  useEffect(() => {
    if (!userId) {
      setAllowed(null)
      return
    }

    setAllowed(null)
    supabase!
      .rpc('is_allowed_user')
      .then(({ data, error }) => {
        if (error) toast.error(`許可チェックに失敗しました: ${error.message}`)
        setAllowed(!error && data === true)
      })
  }, [userId])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">読み込み中...</p>
      </div>
    )
  }

  if (!session) {
    return <LoginForm />
  }

  if (allowed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">確認中...</p>
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          {session.user.email} はこのアプリの利用を許可されていません。
        </p>
        <Button variant="outline" onClick={signOut}>
          ログアウト
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
