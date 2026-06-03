export async function signIn(email: string, password: string) {
  try {
    const res = await fetch('http://localhost:3000/auth/login', {
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
