import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { createTask, deleteTask, listTasks, updateTask } from '@/lib/tasks'
import type { Task, TaskStatus } from '@/types/task'

function toMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listTasks()
      setTasks(data)
    } catch (err) {
      setError(toMessage(err, '読み込みに失敗しました'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const create = useCallback(async (input: { title: string; description: string }) => {
    try {
      const task = await createTask(input)
      setTasks((prev) => [...prev, task])
      toast.success('タスクを作成しました')
      return task
    } catch (err) {
      toast.error(toMessage(err, '作成に失敗しました'))
      throw err
    }
  }, [])

  const update = useCallback(
    async (id: string, patch: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => {
      try {
        const updated = await updateTask(id, patch)
        setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)))
        toast.success('タスクを更新しました')
        return updated
      } catch (err) {
        toast.error(toMessage(err, '更新に失敗しました'))
        throw err
      }
    },
    []
  )

  // ドラッグでの列移動用。先にローカル state を更新し、失敗したら元に戻す。
  const move = useCallback(async (id: string, status: TaskStatus) => {
    let previous: Task[] = []
    setTasks((prev) => {
      previous = prev
      return prev.map((task) => (task.id === id ? { ...task, status } : task))
    })

    try {
      await updateTask(id, { status })
    } catch (err) {
      setTasks(previous)
      toast.error(toMessage(err, '移動に失敗しました'))
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
      toast.success('タスクを削除しました')
    } catch (err) {
      toast.error(toMessage(err, '削除に失敗しました'))
      throw err
    }
  }, [])

  return { tasks, loading, error, reload, create, update, move, remove }
}
