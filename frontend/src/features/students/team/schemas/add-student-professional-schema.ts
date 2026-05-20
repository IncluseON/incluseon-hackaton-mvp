import { z } from "zod"

export const addStudentProfessionalSchema = z.object({
  user_id: z.coerce
    .number()
    .optional(),

  role_in_student: z.enum([
    "owner",
    "aee",
    "support",
    "psychologist",
    "supervisor",
    "viewer"
  ]),

  can_view: z.boolean().default(true),

  can_register_aba: z.boolean().default(false),

  can_create_assessment: z.boolean().default(false),

  can_create_pei: z.boolean().default(false),

  can_generate_ai_report: z.boolean().default(false),

  can_view_reports: z.boolean().default(false)
})

export type AddStudentProfessionalFormData =
  z.input<typeof addStudentProfessionalSchema>

export type AddStudentProfessionalData =
  z.output<typeof addStudentProfessionalSchema>