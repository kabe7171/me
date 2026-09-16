import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { TASK_STATUSES, TASK_STATUS_LABELS } from '@/types/task'
import type { Task, TaskStatus } from '@/types/task'

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  task: Task | null
  onCreate: (input: { title: string; description: string }) => Promise<Task>
  onUpdate: (
    id: string,
    patch: Partial<Pick<Task, 'title' | 'description' | 'status'>>
  ) => Promise<Task>
}

export function TaskDialog({
  open,
  onOpenChange,
  mode,
  task,
  onCreate,
  onUpdate,
}: TaskDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('todo')
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setErrorMessage(null)
    if (mode === 'edit' && task) {
      setTitle(task.title)
      setDescription(task.description)
      setStatus(task.status)
    } else {
      setTitle('')
      setDescription('')
      setStatus('todo')
    }
  }, [open, mode, task])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (title.trim() === '') {
      setErrorMessage('タイトルを入力してください')
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    try {
      if (mode === 'edit' && task) {
        await onUpdate(task.id, { title, description, status })
      } else {
        await onCreate({ title, description })
      }
      onOpenChange(false)
    } catch {
      // 失敗時のトーストは useTasks 側で表示済み
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'タスクを編集' : '新規タスク'}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? 'タスクの内容を編集します。' : '新しいタスクを作成します。'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="task-title">タイトル</Label>
            <Input
              id="task-title"
              value={title}
              maxLength={200}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="task-description">説明</Label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {mode === 'edit' && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="task-status">状態</Label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {TASK_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {TASK_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          )}
          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? '保存中...' : '保存'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
