import { useQuery } from "@tanstack/react-query"

import { getStudentBehaviorAnalytics } from "../schemas/get-student-behavior-analytics"

export function useStudentBehaviorAnalytics(
  studentId: string
) {
  return useQuery({
    queryKey: [
      "student-behavior-analytics",
      studentId
    ],

    queryFn: () =>
      getStudentBehaviorAnalytics(studentId),

    enabled: !!studentId
  })
}