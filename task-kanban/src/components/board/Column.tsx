import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { TaskCard } from '@/components/board/TaskCard'
import { TASK_STATUS_LABELS } from '@/types/task'
import type { Task, TaskStatus } from '@/types/task'

interface ColumnProps {
  status: TaskStatus
  tasks: Task[]
  onTaskClick: (task: Task) => void
  onTaskDelete: (id: string) => void
}

export function Column({ status, tasks, onTaskClick, onTaskDelete }: ColumnProps) {
  const { isOver, setNodeRef } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex min-h-[70vh] min-w-72 shrink-0 flex-col gap-3 rounded-lg border bg-muted/30 p-3',
        isOver && 'bg-muted'
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">{TASK_STATUS_LABELS[status]}</h2>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">タスクなし</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              onDelete={() => onTaskDelete(task.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
