import type { ReactNode } from "react"

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"

import { AuthProvider } from "../features/auth/context/auth-provider"

const queryClient = new QueryClient()

type Props = {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}