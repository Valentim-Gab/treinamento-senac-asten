import { signUp } from '@/services/AuthService'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import './login.css'
import OnlyGuest from '@/guards/OnlyGuest'

export default function RegisterPage() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    try {
      await signUp(name, email, password)
      alert('Cadastro realizado com sucesso!')
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
            placeholder="Nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn">
            Criar
          </button>
        </form>
      </main>
    </OnlyGuest>
  )
}
