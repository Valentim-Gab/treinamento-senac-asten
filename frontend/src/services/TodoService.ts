import { env } from '@/envs/Environment'
import type { Todo } from '@/interfaces/Todo'

export async function findTodos(): Promise<Todo[]> {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYWRtaW5AZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzgxNjU3MjIyLCJleHAiOjE3ODE2NjA4MjJ9.jIAhJRDPClpgtQYcHd3iSe-XG7KCc2iM0MuyxFV6wos'
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
