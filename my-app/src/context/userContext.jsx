import { createContext, useState, useEffect } from 'react'
import { useSupabaseAuth } from '../supabase'
import { useContext } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const { getUserInfo } = useSupabaseAuth()
  useEffect(() => {
    ;(async () => {
      const userInfo = await getUserInfo()
      if (userInfo?.user) {
        setUser(userInfo.user)
      }
    })()
  }, [])
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('UserContext가 초기화되지 않았습니다.')
  return context
}
