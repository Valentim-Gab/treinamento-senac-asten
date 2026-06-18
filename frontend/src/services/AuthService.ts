import { env } from '@/envs/Environment'

export async function signIn(email: string, password: string) {
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
