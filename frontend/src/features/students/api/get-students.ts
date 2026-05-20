import { api } from "../../../api/client"

import type { Student } from "@/features/auth/types/student"
import type { PaginatedResponse } from "@/features/auth/types/pagination"

type GetStudentsParams = {
  page?: number
  per_page?: number
  search?: string
}

export async function getStudents({
  page = 1,
  per_page = 10,
  search = ""
}: GetStudentsParams = {}) {
  const response = await api.get<PaginatedResponse<Student>>(
    "/students",
    {
      params: {
        page,
        per_page,
        search
      }
    }
  )

  return response.data
}