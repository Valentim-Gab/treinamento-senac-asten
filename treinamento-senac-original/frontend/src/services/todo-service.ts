import { environment } from '@/envs/Environment'
import type { Todo } from '@/interfaces/Todo'
import { getToken } from './auth-service'

export async function findTodos(): Promise<Todo[]> {
  try {
    const token = getToken()
    const res = await fetch(`${environment.apiBaseUrl}/todos`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return await res.json()
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

export async function createTodo({ title }: { title?: string }): Promise<Todo> {
  try {
    const token = getToken()
    const res = await fetch(`${environment.apiBaseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    })

    return await res.json()
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

export async function updateTodo(
  id: number,
  { title }: { title?: string },
): Promise<Todo> {
  try {
    const token = getToken()
    const res = await fetch(`${environment.apiBaseUrl}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    })

    return await res.json()
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

export async function updateTodoCompleted(
  id: number,
  completed: boolean,
): Promise<Todo> {
  try {
    const token = getToken()
    const res = await fetch(`${environment.apiBaseUrl}/todos/${id}/completed`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed }),
    })

    return await res.json()
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const token = getToken()
    await fetch(`${environment.apiBaseUrl}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}
