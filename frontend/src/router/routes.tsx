import App from '@/App'
import LoginPage from '@/pages/PublicPages/LoginPage'
import RegisterPage from '@/pages/PublicPages/RegisterPage'
import { createBrowserRouter } from 'react-router'
import { todoRoutes } from './TodoRoutes'
import MainLayout from '@/layouts/MainLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [todoRoutes],
      },
    ],
  },
])
