import { useState } from 'react'
import type { FormEvent } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage(null)

    const { error } = await supabase!.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
        shouldCreateUser: false,
      },
    })

    setSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
      toast.error(error.message)
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="max-w-sm text-center text-sm text-muted-foreground">
          {email} にログイン用のリンクを送信しました。メールを確認してください。
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Task Kanban</h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力するとログイン用のリンクが送信されます。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
        <Button type="submit" disabled={submitting}>
          {submitting ? '送信中...' : 'ログインリンクを送信'}
        </Button>
      </form>
    </div>
  )
}
