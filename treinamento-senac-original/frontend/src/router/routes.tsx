import App from '@/App'
import { createBrowserRouter } from 'react-router'
import { todoRoutes } from './TodoRoutes'
import Test from '@/pages/PublicPages/Test'
import MainLayout from '@/layouts/MainLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        lazy: {
          Component: async () =>
            (await import('@/pages/PublicPages/LoginPage')).default,
        },
      },
      {
        path: '/register',
        lazy: {
          Component: async () =>
            (await import('@/pages/PublicPages/RegisterPage')).default,
        },
      },
      {
        path: '/test',
        element: <Test />,
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: '/admin',
            lazy: {
              Component: async () =>
                (await import('@/pages/ProtectedAdminPage')).default,
            },
          },
          todoRoutes,
        ],
      },
    ],
  },
  {
    path: '*',
    lazy: {
      Component: async () =>
        (await import('@/pages/PublicPages/NotFoundPage')).default,
    },
  },
])
