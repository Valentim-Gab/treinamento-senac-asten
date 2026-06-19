import { environment } from '@/envs/Environment'
import type { User } from '@/interfaces/User'
import { getToken } from './auth-service'

export async function findUsers(): Promise<User[]> {
  try {
    const token = getToken()
    const res = await fetch(`${environment.apiBaseUrl}/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return await res.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
