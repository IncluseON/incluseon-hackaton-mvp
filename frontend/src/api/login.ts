import { api } from "./client"
import type { LoginData } from "@/features/auth/schemas/login-schema"

export async function login(
  data: LoginData
) {

  const formData =
    new URLSearchParams()

  formData.append(
    "username",
    data.email
  )

  formData.append(
    "password",
    data.password
  )

  const response =
    await api.post(

      "/auth/login",

      formData,

      {
        headers: {

          "Content-Type":
          "application/x-www-form-urlencoded"
        }
      }
    )

  return response.data
}