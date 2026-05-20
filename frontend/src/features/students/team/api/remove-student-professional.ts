import { api } from "../../../../api/client"

type RemoveStudentProfessionalParams = {
  studentId: string
  linkId: number
}

export async function removeStudentProfessional({
  studentId,
  linkId
}: RemoveStudentProfessionalParams) {
  await api.delete(
    `/students/${studentId}/professionals/${linkId}`
  )
}