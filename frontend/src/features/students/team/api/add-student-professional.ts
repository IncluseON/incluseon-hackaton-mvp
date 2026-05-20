import { api } from "../../../../api/client"

import type {
  StudentProfessional
} from "../types/student-professional"

import type {
  AddStudentProfessionalData
} from "../schemas/add-student-professional-schema"

type AddStudentProfessionalParams = {
  studentId: string
  data: AddStudentProfessionalData
}

export async function addStudentProfessional({
  studentId,
  data
}: AddStudentProfessionalParams) {
  const response = await api.post<StudentProfessional>(
    `/students/${studentId}/professionals`,
    data
  )

  return response.data
}