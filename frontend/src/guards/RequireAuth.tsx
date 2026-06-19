import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router'

type Role = 'admin' | 'user'

export function RequireAuth({
  children,
  roles,
}: {
  children: React.ReactNode
  roles?: Role[]
}) {
  const { isAuth, isLoading, user } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuth) {
    return <Navigate to="/" replace />
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
