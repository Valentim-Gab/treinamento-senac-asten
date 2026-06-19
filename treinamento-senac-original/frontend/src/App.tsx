import { Outlet } from 'react-router'
import { AuthProvider } from './providers/AuthProvider'

export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
