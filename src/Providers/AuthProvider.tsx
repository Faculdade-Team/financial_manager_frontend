import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren
} from 'react'
import { AuthUserRepositoryImp } from '../repositories/UserRepository'

interface User {
  id: number
  name: string
  email: string
  balance?: number // Exemplo de campo adicional
  loadUser?: () => Promise<void>
}

interface AuthContextType {
  user: User | null
  login: (token: string) => Promise<void>
  logout: () => void
  loading: boolean
  loadUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Carrega o usuário se já houver token salvo
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const res = await AuthUserRepositoryImp.getProfile()
          console.log('User data loaded:', res.data)
          setUser(res.data)
        } catch (error) {
          console.error('Error loading user:', error)
        }
      }
      setLoading(false)
    }
    loadUser()
  }, [])

  const login = async (token: string, userDataFromLogin?: User) => {
    localStorage.setItem('token', token)
    let userData = userDataFromLogin

    // Se não veio tudo do login, faz o GET
    if (!userData) {
      const res = await AuthUserRepositoryImp.getProfile()
      console.log('User data from profile:', res.data)
      userData = res.data
    }

    setUser(userData as User)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const loadUser = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const res = await AuthUserRepositoryImp.getProfile()
        setUser(res.data)
      } catch (error) {
        setUser(null)
      }
    }
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{ user: user?.user, login, logout, loading, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
