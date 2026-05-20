import {

  useEffect,

  useState,

  type ReactNode

} from "react"

import { api }
from "../../../api/client"

import type { User }
from "../types/user"

import { AuthContext }
from "./auth-context"


type Props = {
  children: ReactNode
}

export function AuthProvider({
  children
}: Props) {

  const [user, setUser] =
    useState<User | null>(null)

  const [loading, setLoading] =
    useState(true)


  async function loadUser() {

    const token =
      localStorage.getItem(
        "access_token"
      )

    if (!token) {

      setLoading(false)

      return
    }

    try {

      const response =
        await api.get("/users/me")

      setUser(response.data)

    } catch {

      localStorage.removeItem(
        "access_token"
      )
    }

    setLoading(false)
  }

  function login(
    token: string
  ) {

    localStorage.setItem(
      "access_token",
      token
    )

    loadUser()
  }

    function logout() {

    localStorage.removeItem(
      "access_token"
    )

    setUser(null)
  }


useEffect(() => {

  async function initialize() {

    await loadUser()
  }

  initialize()

}, [])


    return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        login,

        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}