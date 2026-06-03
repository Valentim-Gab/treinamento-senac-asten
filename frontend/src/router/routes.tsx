import App from '@/App'
import LoginPage from '@/pages/PublicPages/LoginPage'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
])
