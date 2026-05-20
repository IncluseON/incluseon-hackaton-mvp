import { useQuery } from "@tanstack/react-query"

import { getAssessments } from "../api/get-assessments"

export function useAssessments(studentId: string) {
  return useQuery({
    queryKey: ["assessments", studentId],
    queryFn: () => getAssessments(studentId),
    enabled: !!studentId
  })
}