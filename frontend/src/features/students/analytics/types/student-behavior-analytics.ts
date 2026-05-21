export type IntensityEvolutionItem = {
  date: string
  intensity: number
}

export type EnvironmentDistributionItem = {
  environment: string
  total: number
}

export type StrategyEffectivenessItem = {
  strategy: string
  effective: number
  not_effective: number
}

export type BehaviorFrequencyItem = {
  behavior: string
  total: number
}

export type AntecedentFrequencyItem = {
  antecedent: string
  total: number
}

export type StudentBehaviorAnalytics = {
  records_count: number
  average_intensity: number | null
  most_common_environment: string | null
  most_effective_strategy: string | null

  intensity_evolution: IntensityEvolutionItem[]
  environment_distribution: EnvironmentDistributionItem[]
  strategy_effectiveness: StrategyEffectivenessItem[]
  behavior_frequency: BehaviorFrequencyItem[]
  antecedent_frequency: AntecedentFrequencyItem[]
}