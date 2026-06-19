import { Outlet } from 'react-router'
import { RequireAuth } from '@/guards/RequireAuth'
import Header from './components/Header'

export default function MainLayout() {
  return (
    <RequireAuth>
      <Header />
      <Outlet />
    </RequireAuth>
  )
}
