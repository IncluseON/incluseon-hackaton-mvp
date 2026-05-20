import { api } from "../../../../api/client"

import type {
  SavedAIReport
} from "../types/saved-ai-report"

export async function getStudentAIReports(
  studentId: string
) {
  const response =
    await api.get<SavedAIReport[]>(
      `/ai-reports/student/${studentId}`
    )

  return response.data
}