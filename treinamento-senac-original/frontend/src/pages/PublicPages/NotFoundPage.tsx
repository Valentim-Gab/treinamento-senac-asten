import { Link } from 'react-router'
import './NotFound.css'

export default function NotFoundPage() {
  return (
    <main className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound-subtitle">Página não encontrada</p>

      <Link to="/" className="notfound-link">
        Voltar para a home
      </Link>
    </main>
  )
}