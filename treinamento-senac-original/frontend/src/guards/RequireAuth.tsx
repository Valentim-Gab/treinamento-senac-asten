import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

type Role = 'user' | 'admin'

export function RequireAuth({
  children,
  roles,
}: {
  children: React.ReactNode
  roles?: Role[]
}) {
  const { isAuth, isLoading, user } = useAuth()

  if (isLoading) return <div>Loading...</div>

  if (!isAuth) {
    return <Navigate to="/" replace />
  }

  if (roles && !roles.includes(user?.role as Role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}