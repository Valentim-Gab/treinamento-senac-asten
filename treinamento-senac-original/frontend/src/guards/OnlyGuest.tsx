import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router'

export function OnlyGuest({ children }: { children: React.ReactNode }) {
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuth) {
    return <Navigate to="/todos" replace />
  }

  return children
}
