import { supabase } from '@/lib/supabase'
import type { Task } from '@/types/task'

export async function listTasks(): Promise<Task[]> {
  const { data, error } = await supabase!
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw new Error(error.message)
  return data as Task[]
}

export async function createTask(input: {
  title: string
  description: string
}): Promise<Task> {
  const { data, error } = await supabase!
    .from('tasks')
    .insert({ title: input.title, description: input.description, status: 'todo' })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Task
}

export async function updateTask(
  id: string,
  patch: Partial<Pick<Task, 'title' | 'description' | 'status'>>
): Promise<Task> {
  const { data, error } = await supabase!
    .from('tasks')
    .update(patch)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Task
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase!.from('tasks').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
