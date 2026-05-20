import { api } from "../../../../api/client"

import type { Assessment } from "../types/assessment"
import type { PaginatedResponse } from "@/features/auth/types/pagination"

export async function getAssessments(studentId: string) {
  const response = await api.get<PaginatedResponse<Assessment>>(
    `/assessments/student/${studentId}`
  )

  return response.data
}