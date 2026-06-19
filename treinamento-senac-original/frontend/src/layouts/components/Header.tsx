import { useAuth } from '@/hooks/useAuth'
import './header.css'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="main-header">
      <p>{user?.name || 'Bem-vindo'}</p>
      <button className="btn-logout" onClick={logout}>
        Sair
      </button>
    </header>
  )
}
