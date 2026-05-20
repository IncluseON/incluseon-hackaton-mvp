import { api } from "../../../../api/client"

import type {
  StudentProfessional,
  StudentProfessionalRole
} from "../types/student-professional"

export type UpdateStudentProfessionalData = {
  role_in_student?: StudentProfessionalRole
  can_view?: boolean
  can_register_aba?: boolean
  can_create_assessment?: boolean
  can_create_pei?: boolean
  can_generate_ai_report?: boolean
  can_view_reports?: boolean
}

type UpdateStudentProfessionalParams = {
  studentId: string
  linkId: number
  data: UpdateStudentProfessionalData
}

export async function updateStudentProfessional({
  studentId,
  linkId,
  data
}: UpdateStudentProfessionalParams) {
  const response = await api.patch<StudentProfessional>(
    `/students/${studentId}/professionals/${linkId}`,
    data
  )

  return response.data
}