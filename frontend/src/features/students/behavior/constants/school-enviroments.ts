export const SCHOOL_ENVIRONMENTS = [
  "Sala de aula",
  "Sala de recursos",
  "Pátio",
  "Refeitório",
  "Biblioteca",
  "Quadra",
  "Corredor",
  "Banheiro",
  "Entrada da escola",
  "Saída da escola",
  "Transporte escolar",
  "Atendimento individual",
  "Atividade externa",
  "Outro"
] as const

export type SchoolEnvironment =
  typeof SCHOOL_ENVIRONMENTS[number]