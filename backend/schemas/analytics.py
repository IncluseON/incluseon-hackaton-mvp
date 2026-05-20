from pydantic import BaseModel


class StudentBehaviorAnalytics(
    BaseModel
):

    records_count: int

    average_intensity: float | None

    most_common_environment: str | None

    most_effective_strategy: str | None