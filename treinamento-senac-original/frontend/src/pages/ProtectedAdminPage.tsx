import { RequireAuth } from '@/guards/RequireAuth'

export default function ProtectedAdminPage() {
  return (
    <RequireAuth roles={['admin']}>
      <main>
        <h1>Protected Admin Page</h1>
        <p>Only users with the 'admin' role can see this page.</p>
      </main>
    </RequireAuth>  
  )
}
