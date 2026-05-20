export type Assessment = {
  id: number

  student_id: number
  psychologist_id: number

  title: string
  assessment_type: string

  assessment_data: Record<string, unknown>

  created_at: string
  updated_at: string
}