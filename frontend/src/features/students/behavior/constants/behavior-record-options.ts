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
  "Outro",
] as const;

export const BEHAVIOR_CATEGORIES = [
  "Recusa de atividade",
  "Choro",
  "Grito",
  "Agitação motora",
  "Agressividade",
  "Autoagressão",
  "Fuga ou tentativa de sair do ambiente",
  "Isolamento",
  "Crise sensorial",
  "Dificuldade de transição",
  "Jogar objetos",
  "Levantar-se sem autorização",
  "Não responder a comandos",
  "Comportamento repetitivo",
  "Outro",
] as const;

export const ANTECEDENT_CATEGORIES = [
  "Mudança de rotina",
  "Atividade difícil",
  "Ambiente barulhento",
  "Espera prolongada",
  "Frustração",
  "Interação social",
  "Retirada de objeto preferido",
  "Transição de atividade",
  "Excesso de estímulos",
  "Falta de previsibilidade",
  "Correção ou negativa",
  "Demanda acadêmica",
  "Separação do responsável",
  "Outro",
] as const;

export const STRATEGY_OPTIONS = [
  "Rotina visual",
  "Pausa sensorial",
  "Reforço positivo",
  "Divisão da tarefa",
  "Antecipação de mudança",
  "Redução de estímulos",
  "Mediação verbal",
  "Apoio individual",
  "Comunicação alternativa",
  "Redirecionamento",
  "Tempo de espera",
  "Escolha entre opções",
  "Retirada para ambiente calmo",
  "Outro",
] as const;

export const FUNCTION_HYPOTHESES = [
  "Fuga ou esquiva de demanda",
  "Busca por atenção",
  "Acesso a item ou atividade",
  "Autorregulação sensorial",
  "Comunicação de necessidade",
  "Frustração ou dificuldade emocional",
  "Dor ou desconforto físico",
  "Não identificado",
  "Outro",
] as const;

export type BehaviorCategory = (typeof BEHAVIOR_CATEGORIES)[number];

export type AntecedentCategory = (typeof ANTECEDENT_CATEGORIES)[number];

export type StrategyOption = (typeof STRATEGY_OPTIONS)[number];

export type FunctionHypothesis = (typeof FUNCTION_HYPOTHESES)[number];

export type SchoolEnvironment = (typeof SCHOOL_ENVIRONMENTS)[number];
