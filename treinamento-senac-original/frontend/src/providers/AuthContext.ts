import type { UserAuth } from '@/interfaces/Auth'
import { createContext } from 'react'

export type AuthContextType = {
  user: null | UserAuth
  isAuth: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
