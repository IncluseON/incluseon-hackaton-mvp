import {

  Navigate

} from "react-router-dom"

import { useAuth }
from "../features/auth/hooks/use-auth"

import type {
  ReactNode
} from "react"

type Props = {
  children: ReactNode
}

export function ProtectedRoute({
  children
}: Props) {

  const {

    user,

    loading

  } = useAuth()

  if (loading) {

    return <p>Loading...</p>
  }

  if (!user) {

    return (
      <Navigate
        to="/login"
      />
    )
  }

  return children
}