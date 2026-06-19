import { environment } from '@/envs/Environment'
import type { UserAuth } from '@/interfaces/Auth'

export async function getMe(): Promise<UserAuth> {
  try {
    const token = getToken()
    if (!token) {
      throw new Error('No token found')
    }

    const res = await fetch(`${environment.apiBaseUrl}/auth/@me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch user data')
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    const res = await fetch(`${environment.apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Failed to sign in')
    }

    await saveToken(data.accessToken)
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

export async function signUp(name: string, email: string, password: string) {
  try {
    const res = await fetch(`${environment.apiBaseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Failed to sign up')
    }
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

export async function signOut(): Promise<void> {
  try {
    localStorage.removeItem('authToken')
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function saveToken(token: string): Promise<void> {
  try {
    localStorage.setItem('authToken', token)
  } catch (error) {
    console.error('Error saving token:', error)
    throw error
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem('authToken')
  } catch (error) {
    console.error('Error getting token:', error)
    return null
  }
}
