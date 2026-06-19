import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router'

export default function OnlyGuest({ children }: { children: React.ReactNode }) {
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuth) {
    return <Navigate to="/todos" />
  }

  return children
}
