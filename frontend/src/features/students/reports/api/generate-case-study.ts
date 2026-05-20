import { api } from "../../../../api/client"

import type {
  GenerateCaseStudyResponse
} from "../types/ai-report"

export async function generateCaseStudy(
  studentId: string
) {
  const response =
    await api.post<GenerateCaseStudyResponse>(
      `/ai/student/${studentId}/case-study`
    )

  return response.data
}