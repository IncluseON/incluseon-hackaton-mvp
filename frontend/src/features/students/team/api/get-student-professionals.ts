import { api } from "../../../../api/client"

import type {
  StudentProfessional
} from "../types/student-professional"

export async function getStudentProfessionals(
  studentId: string
) {
  const response = await api.get<StudentProfessional[]>(
    `/students/${studentId}/professionals`
  )

  return response.data
}