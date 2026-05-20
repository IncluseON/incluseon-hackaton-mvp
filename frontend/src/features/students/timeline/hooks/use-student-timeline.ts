import { useQuery } from "@tanstack/react-query"

import { getStudentTimeline } from "../api/get-student-timeline"

export function useStudentTimeline(studentId: string) {
  return useQuery({
    queryKey: ["student-timeline", studentId],
    queryFn: () => getStudentTimeline(studentId),
    enabled: !!studentId
  })
}