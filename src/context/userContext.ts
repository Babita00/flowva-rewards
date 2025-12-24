import { createContext } from 'react'
import type { UserContextType } from '../types/user.types'

export const UserContext = createContext<UserContextType>({
  user: null,
  balance: null,
  loading: true,
  refetchBalance: async () => {},
})
