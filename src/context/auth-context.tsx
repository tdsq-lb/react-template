import React, { useState, ReactNode } from 'react'
import * as auth from 'auth-provider'
import { http } from '../utils/http'
import { useMount } from 'utils'

interface IProps {
  children: ReactNode
}
interface AuthForm {
  username: string;
  password: string;
}

// 通过 token 调用api 获取 user信息
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('userinfo', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider: React.FC<IProps> = (props) => {
  const { children } = props

  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  // 获取user信息
  useMount(() => {
    bootstrapUser().then(setUser)
  })

  return (
    <AuthContext.Provider children={children} value={{ user, login, logout }} />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }
  return context
}
