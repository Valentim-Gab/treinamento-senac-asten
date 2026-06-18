import TodolistPage from '@/pages/TodolistPage'
import type { RouteObject } from 'react-router'

export const todoRoutes: RouteObject = {
  path: 'todos',
  children: [
    {
      index: true,
      element: <TodolistPage />,
    },
  ],
}
