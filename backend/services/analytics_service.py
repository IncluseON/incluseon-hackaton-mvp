from collections import Counter

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.models import BehaviorRecord


async def get_behavior_analytics_for_student(
    db: AsyncSession,
    student_id: int
):
    result = await db.execute(
        select(BehaviorRecord).where(
            BehaviorRecord.student_id == student_id
        )
    )

    records = result.scalars().all()

    if not records:
        return {
            "records_count": 0,
            "average_intensity": None,
            "most_common_environment": None,
            "most_effective_strategy": None
        }

    intensities = [
        record.intensity
        for record in records
        if record.intensity is not None
    ]

    average_intensity = (
        round(sum(intensities) / len(intensities), 2)
        if intensities
        else None
    )

    environments = [
        record.environment
        for record in records
        if record.environment
    ]

    most_common_environment = (
        Counter(environments).most_common(1)[0][0]
        if environments
        else None
    )

    effective_strategies = [
        record.strategy_used
        for record in records
        if record.strategy_effective is True
        and record.strategy_used
    ]

    most_effective_strategy = (
        Counter(effective_strategies).most_common(1)[0][0]
        if effective_strategies
        else None
    )

    return {
        "records_count": len(records),
        "average_intensity": average_intensity,
        "most_common_environment": most_common_environment,
        "most_effective_strategy": most_effective_strategy
    }