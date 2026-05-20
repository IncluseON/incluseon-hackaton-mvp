import { z } from "zod"

export const createBehaviorRecordSchema = z.object({
  antecedent: z
    .string()
    .min(3, "Descreva o antecedente"),

  behavior: z
    .string()
    .min(3, "Descreva o comportamento"),

  consequence: z
    .string()
    .min(3, "Descreva a consequência"),

  strategy_used: z.string().optional(),

  strategy_effective: z
    .enum(["true", "false", ""])
    .optional()
    .transform((value) => {
      if (value === "true") return true
      if (value === "false") return false
      return null
    }),

  environment: z.string().optional(),

  people_present: z.string().optional(),

  intensity: z.coerce
    .number()
    .min(1, "A intensidade mínima é 1")
    .max(10, "A intensidade máxima é 10")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  duration_minutes: z.coerce
    .number()
    .min(0, "Duração inválida")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  function_hypothesis: z.string().optional(),

  observations: z.string().optional()
})

export type CreateBehaviorRecordFormData =
  z.input<typeof createBehaviorRecordSchema>

export type CreateBehaviorRecordData =
  z.output<typeof createBehaviorRecordSchema>