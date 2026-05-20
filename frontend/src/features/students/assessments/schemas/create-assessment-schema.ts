import { z } from "zod"

export const createAssessmentSchema = z.object({
  title: z
    .string()
    .min(3, "O título precisa ter pelo menos 3 caracteres"),

  assessment_type: z
    .string()
    .min(1, "Selecione o tipo de avaliação"),

  student_history: z.string().optional(),
  family_context: z.string().optional(),
  school_context: z.string().optional(),

  cognitive_notes: z.string().optional(),
  communication_notes: z.string().optional(),
  social_notes: z.string().optional(),
  motor_notes: z.string().optional(),
  emotional_notes: z.string().optional(),

  difficulties: z.string().optional(),
  strengths: z.string().optional(),
  recommended_supports: z.string().optional()
})

export type CreateAssessmentFormData =
  z.input<typeof createAssessmentSchema>

export type CreateAssessmentData =
  z.output<typeof createAssessmentSchema>