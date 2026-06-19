import { env } from '@/envs/Environment'
import type { UserAuth } from '@/interfaces/Auth'

export async function getMe(): Promise<UserAuth> {
  try {
    const token = getToken()
    const res = await fetch(`${env.apiBaseUrl}/auth/@me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Falha ao buscar informações do usuário')
    }

    return data
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ accessToken: string }> {
  try {
    const res = await fetch(`${env.apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Falha ao realizar login')
    }

    await saveToken(data.accessToken)

    return data
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

export async function signUp(name: string, email: string, password: string) {
  try {
    const res = await fetch(`${env.apiBaseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Falha ao realizar cadastro')
    }
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

export function signOut() {
  try {
    localStorage.removeItem('accessToken')
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function saveToken(token: string) {
  try {
    localStorage.setItem('accessToken', token)
  } catch (error) {
    console.error('Error saving token:', error)
    throw error
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem('accessToken')
  } catch (error) {
    console.error('Error getting token:', error)
    return null
  }
}
