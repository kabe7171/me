export type TaskStatus =
  | 'todo'
  | 'designing'
  | 'implementing'
  | 'review'
  | 'done'
  | 'needs_check'

export const TASK_STATUSES: readonly TaskStatus[] = [
  'todo',
  'designing',
  'implementing',
  'review',
  'done',
  'needs_check',
]

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: '未着手',
  designing: '設計中',
  implementing: '実装中',
  review: '検収待ち',
  done: '完了',
  needs_check: '要確認',
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  created_at: string
  updated_at: string
}
