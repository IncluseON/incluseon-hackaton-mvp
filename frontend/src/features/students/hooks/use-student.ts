import { useQuery } from "@tanstack/react-query"

import { getStudent } from "../api/get-student"

export function useStudent(studentId: string) {
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudent(studentId),
    enabled: !!studentId
  })
}