import { OnlyGuest } from '@/guards/OnlyGuest'
import { useState } from 'react'
import { signUp } from '@/services/auth-service'
import { useNavigate } from 'react-router'
import './login.css'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    try {
      await signUp(name, email, password)
      alert('Conta criada com sucesso! Faça login para continuar.')
      navigate('/')
    } catch {
      alert('Erro ao criar conta')
    }
  }

  return (
    <OnlyGuest>
      <main className="main-container">
        <form className="card" onSubmit={handleSubmit}>
          <h1>Criar conta</h1>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="btn" type="submit">
            Criar
          </button>
        </form>
      </main>
    </OnlyGuest>
  )
}
