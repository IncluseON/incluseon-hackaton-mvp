import { createContext } from "react"

import type { User }
from "../types/user"

type AuthContextType = {

  user: User | null

  loading: boolean

  login: (
    token: string
  ) => void

  logout: () => void
}

export const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
)