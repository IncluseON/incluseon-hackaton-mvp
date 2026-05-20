import { useQuery } from "@tanstack/react-query"

import {
  getStudentProfessionals
} from "../api/get-student-professionals"

export function useStudentProfessionals(
  studentId: string
) {
  return useQuery({
    queryKey: [
      "student-professionals",
      studentId
    ],
    queryFn: () =>
      getStudentProfessionals(studentId),
    enabled: !!studentId
  })
}