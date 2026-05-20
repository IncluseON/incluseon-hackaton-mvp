import { useQuery } from "@tanstack/react-query"

import {
  getStudentAIReports
} from "../api/get-student-ai-reports"

export function useStudentAIReports(
  studentId: string
) {
  return useQuery({
    queryKey: [
      "student-ai-reports",
      studentId
    ],

    queryFn: () =>
      getStudentAIReports(studentId),

    enabled: !!studentId
  })
}