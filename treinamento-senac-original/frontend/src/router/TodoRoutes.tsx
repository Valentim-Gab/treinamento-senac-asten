import type { RouteObject } from 'react-router'

export const todoRoutes: RouteObject = {
  path: 'todos',
  children: [
    {
      index: true,
      lazy: {
        Component: async () => (await import('@/pages/TodolistPage')).default,
      },
    },
  ],
}
