import { api } from "../../../../api/client"

import type {
  StudentBehaviorAnalytics
} from "../types/student-behavior-analytics"

export async function getStudentBehaviorAnalytics(
  studentId: string
) {
  const response =
    await api.get<StudentBehaviorAnalytics>(
      `/analytics/student/${studentId}/behavior`
    )

  return response.data
}