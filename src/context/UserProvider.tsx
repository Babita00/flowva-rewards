import type { ReactNode } from 'react'
import { UserContext } from './userContext'
import { useAuthSession } from '../hooks/useAuthSession'
import { useUserBalance } from '../hooks/useUserBalance'

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuthSession()
  const { balance, refetchBalance } = useUserBalance(user?.id)

  return (
    <UserContext.Provider
      value={{
        user,
        balance,
        loading,
        refetchBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
