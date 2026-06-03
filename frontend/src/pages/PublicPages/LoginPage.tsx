import { Link } from 'react-router'
import './login.css'
import { useState } from 'react'
import { signIn } from '@/services/AuthService'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const data = await signIn(email, password)
      console.log(data)
    } catch (error) {
      alert((error as Error).message || 'Falha ao fazer login')
    }
  }

  return (
    <main className="main-container">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">
          Entrar
        </button>
        <Link to="/register" className="link">
          Criar conta
        </Link>
      </form>
    </main>
  )
}
