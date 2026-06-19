import { getMe, getToken, signIn, signOut } from '@/services/AuthService'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext, type AuthContextType } from './AuthContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null)
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const bootstrap = async () => {
    try {
      const token = getToken()

      if (!token) {
        return
      }

      return await getMe()
    } catch (error) {
      console.error('Error during auth bootstrap:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await signIn(email, password)

      const me = await getMe()

      setUser(me)
      setIsAuth(true)
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const logout = () => {
    signOut()
    setUser(null)
    setIsAuth(false)
  }

  useEffect(() => {
    void bootstrap()
      .then((user) => {
        if (user) {
          setUser(user)
          setIsAuth(true)
        }
      })
      .catch(() => {
        setUser(null)
        setIsAuth(false)
        signOut()
        navigate('/')
      })
  }, [navigate])

  return (
    <AuthContext.Provider value={{ user, isAuth, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
