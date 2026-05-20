from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.ext.asyncio import AsyncSession

from typing import Annotated

from database import get_db

from dependencies import get_current_user

from services.permissions_service import (
    require_student_access
)

from services.analytics_service import (
    get_behavior_analytics_for_student
)

from models.models import User

from schemas.analytics import (
    StudentBehaviorAnalytics
)


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get(
    "/student/{student_id}/behavior",
    response_model=StudentBehaviorAnalytics
)
async def get_student_behavior_analytics(
    student_id: int,

    db: Annotated[
        AsyncSession,
        Depends(get_db)
    ],

    current_user: Annotated[
        User,
        Depends(get_current_user)
    ]
):
    student = await require_student_access(
        db=db,
        user=current_user,
        student_id=student_id
    )

    analytics = await get_behavior_analytics_for_student(
        db=db,
        student_id=student.id
    )

    return StudentBehaviorAnalytics(
        records_count=analytics["records_count"],
        average_intensity=analytics["average_intensity"],
        most_common_environment=analytics["most_common_environment"],
        most_effective_strategy=analytics["most_effective_strategy"]
    )