from datetime import datetime

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from models.models import AIReport


async def count_user_reports_this_month(
    db: AsyncSession,
    user_id: int
):
    now = datetime.utcnow()

    month_start = datetime(
        year=now.year,
        month=now.month,
        day=1
    )

    result = await db.execute(
        select(func.count())
        .select_from(AIReport)
        .where(
            AIReport.created_by_id == user_id,
            AIReport.created_at >= month_start
        )
    )

    return result.scalar() or 0