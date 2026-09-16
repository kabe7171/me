import { useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { LogOut, Plus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTasks } from '@/hooks/useTasks'
import { Button } from '@/components/ui/button'
import { Column } from '@/components/board/Column'
import { TaskDialog } from '@/components/board/TaskDialog'
import { TASK_STATUSES } from '@/types/task'
import type { Task, TaskStatus } from '@/types/task'

export function Board() {
  const { session, signOut } = useAuth()
  const { tasks, loading, error, reload, create, update, move, remove } = useTasks()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const taskId = String(active.id)
    const targetStatus = over.id as TaskStatus
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.status === targetStatus) return

    void move(taskId, targetStatus)
  }

  const openCreateDialog = () => {
    setEditingTask(null)
    setDialogOpen(true)
  }

  const openEditDialog = (task: Task) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Task Kanban</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{session?.user.email}</span>
          <Button size="sm" onClick={openCreateDialog}>
            <Plus /> 新規タスク
          </Button>
          <Button size="sm" variant="outline" onClick={signOut}>
            <LogOut /> ログアウト
          </Button>
        </div>
      </header>

      {error && (
        <div className="flex items-center justify-between gap-4 border-b bg-destructive/10 px-4 py-2 text-sm text-destructive">
          <span>{error}</span>
          <Button size="sm" variant="outline" onClick={reload}>
            再読み込み
          </Button>
        </div>
      )}

      <main className="flex-1 overflow-x-auto p-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">読み込み中...</p>
        ) : (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="flex gap-4">
              {TASK_STATUSES.map((status) => (
                <Column
                  key={status}
                  status={status}
                  tasks={tasks.filter((t) => t.status === status)}
                  onTaskClick={openEditDialog}
                  onTaskDelete={remove}
                />
              ))}
            </div>
          </DndContext>
        )}
      </main>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={editingTask ? 'edit' : 'create'}
        task={editingTask}
        onCreate={create}
        onUpdate={update}
      />
    </div>
  )
}
