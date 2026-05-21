from pydantic import BaseModel


class IntensityEvolutionItem(BaseModel):
    date: str
    intensity: int


class EnvironmentDistributionItem(BaseModel):
    environment: str
    total: int


class StrategyEffectivenessItem(BaseModel):
    strategy: str
    effective: int
    not_effective: int


class BehaviorFrequencyItem(BaseModel):
    behavior: str
    total: int


class AntecedentFrequencyItem(BaseModel):
    antecedent: str
    total: int


class StudentBehaviorAnalytics(BaseModel):
    records_count: int
    average_intensity: float | None
    most_common_environment: str | None
    most_effective_strategy: str | None

    intensity_evolution: list[IntensityEvolutionItem] = []
    environment_distribution: list[EnvironmentDistributionItem] = []
    strategy_effectiveness: list[StrategyEffectivenessItem] = []
    behavior_frequency: list[BehaviorFrequencyItem] = []
    antecedent_frequency: list[AntecedentFrequencyItem] = []