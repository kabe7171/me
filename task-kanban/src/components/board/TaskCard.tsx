import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DeleteTaskDialog } from '@/components/board/DeleteTaskDialog'
import type { Task } from '@/types/task'

interface TaskCardProps {
  task: Task
  onClick: () => void
  onDelete: () => void
}

export function TaskCard({ task, onClick, onDelete }: TaskCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={onClick}
        className={cn('flex-row items-start justify-between gap-2 p-3 cursor-pointer', isDragging && 'opacity-50')}
      >
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-sm font-medium break-words">{task.title}</p>
          {task.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{task.description}</p>
          )}
        </div>
        <Button
          size="icon-xs"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation()
            setDeleteOpen(true)
          }}
        >
          <Trash2 />
        </Button>
      </Card>

      <DeleteTaskDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={task.title}
        onConfirm={onDelete}
      />
    </>
  )
}
