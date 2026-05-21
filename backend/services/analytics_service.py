from collections import Counter, defaultdict

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.models import BehaviorRecord


async def get_behavior_analytics_for_student(
    db: AsyncSession,
    student_id: int
):
    result = await db.execute(
        select(BehaviorRecord)
        .where(
            BehaviorRecord.student_id == student_id
        )
        .order_by(
            BehaviorRecord.created_at.asc()
        )
    )

    records = result.scalars().all()

    if not records:
        return {
            "records_count": 0,
            "average_intensity": None,
            "most_common_environment": None,
            "most_effective_strategy": None,
            "intensity_evolution": [],
            "environment_distribution": [],
            "strategy_effectiveness": [],
            "behavior_frequency": [],
            "antecedent_frequency": []
        }

    intensities = [
        record.intensity
        for record in records
        if record.intensity is not None
    ]

    average_intensity = (
        round(
            sum(intensities) / len(intensities),
            2
        )
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

    intensity_evolution = [
        {
            "date": record.created_at.strftime("%d/%m"),
            "intensity": record.intensity
        }
        for record in records
        if record.intensity is not None
        and record.created_at is not None
    ]

    environment_counter = Counter(environments)

    environment_distribution = [
        {
            "environment": environment,
            "total": total
        }
        for environment, total in environment_counter.most_common()
    ]

    strategy_map = defaultdict(
        lambda: {
            "effective": 0,
            "not_effective": 0
        }
    )

    for record in records:
        if not record.strategy_used:
            continue

        if record.strategy_effective is True:
            strategy_map[record.strategy_used]["effective"] += 1
        else:
            strategy_map[record.strategy_used]["not_effective"] += 1

    strategy_effectiveness = [
        {
            "strategy": strategy,
            "effective": values["effective"],
            "not_effective": values["not_effective"]
        }
        for strategy, values in strategy_map.items()
    ]

    behaviors = [
        record.behavior
        for record in records
        if record.behavior
    ]

    behavior_counter = Counter(behaviors)

    behavior_frequency = [
        {
            "behavior": behavior,
            "total": total
        }
        for behavior, total in behavior_counter.most_common()
    ]

    antecedents = [
        record.antecedent
        for record in records
        if record.antecedent
    ]

    antecedent_counter = Counter(antecedents)

    antecedent_frequency = [
        {
            "antecedent": antecedent,
            "total": total
        }
        for antecedent, total in antecedent_counter.most_common()
    ]

    return {
        "records_count": len(records),
        "average_intensity": average_intensity,
        "most_common_environment": most_common_environment,
        "most_effective_strategy": most_effective_strategy,
        "intensity_evolution": intensity_evolution,
        "environment_distribution": environment_distribution,
        "strategy_effectiveness": strategy_effectiveness,
        "behavior_frequency": behavior_frequency,
        "antecedent_frequency": antecedent_frequency
    }