import { env } from '@/envs/Environment'
import type { CreateTodo, Todo } from '@/interfaces/Todo'
import { getToken } from './AuthService'

export async function findTodos(): Promise<Todo[]> {
  try {
    const token = getToken()
    const res = await fetch(`${env.apiBaseUrl}/todos`, {
      method: 'GET',
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

export async function createTodo({ title }: CreateTodo): Promise<Todo> {
  try {
    const token = getToken()
    const res = await fetch(`${env.apiBaseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    })

    return await res.json()
  } catch (error) {
    console.error('Error creating todo:', error)
    throw error
  }
}

export async function updateTodoCompleted(
  id: number,
  completed: boolean,
): Promise<Todo> {
  try {
    const token = getToken()
    const res = await fetch(`${env.apiBaseUrl}/todos/${id}/completed`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed }),
    })

    return await res.json()
  } catch (error) {
    console.error('Error updating todo completed:', error)
    throw error
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const token = getToken()
    await fetch(`${env.apiBaseUrl}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error('Error deleting todo:', error)
    throw error
  }
}
