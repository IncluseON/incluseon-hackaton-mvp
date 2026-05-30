import { z } from "zod"

import {
  ANTECEDENT_CATEGORIES,
  BEHAVIOR_CATEGORIES,
  FUNCTION_HYPOTHESES,
  SCHOOL_ENVIRONMENTS,
  STRATEGY_OPTIONS
} from "../constants/behavior-record-options"

export const createBehaviorRecordSchema = z.object({
  antecedent: z.enum(ANTECEDENT_CATEGORIES, {
    message: "Selecione o antecedente/gatilho"
  }),

  behavior: z.enum(BEHAVIOR_CATEGORIES, {
    message: "Selecione o comportamento observado"
  }),

  consequence: z
    .string()
    .min(3, "Descreva a consequência"),

  strategy_used: z
    .enum(STRATEGY_OPTIONS, {
      message: "Selecione uma estratégia válida"
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),

  strategy_effective: z
    .enum(["true", "false", ""])
    .optional()
    .transform((value) => {
      if (value === "true") return true
      if (value === "false") return false
      return null
    }),

  environment: z.enum(SCHOOL_ENVIRONMENTS, {
    message: "Selecione o ambiente"
  }),

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

  function_hypothesis: z
    .enum(FUNCTION_HYPOTHESES, {
      message: "Selecione a hipótese da função"
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),

  observations: z.string().optional()
})

export type CreateBehaviorRecordFormData =
  z.input<typeof createBehaviorRecordSchema>

export type CreateBehaviorRecordData =
  z.output<typeof createBehaviorRecordSchema>