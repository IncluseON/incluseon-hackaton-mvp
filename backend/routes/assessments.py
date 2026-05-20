from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from typing import Annotated

from database import get_db

from dependencies import get_current_user

from services.permissions_service import (
    require_student_permission,
    require_student_access
)

from models.models import (
    User,
    Assessment
)

from schemas.assessment import (
    AssessmentCreate,
    AssessmentResponse
)


router = APIRouter(
    prefix="/assessments",
    tags=["Assessments"]
)


@router.post(
    "/student/{student_id}",
    response_model=AssessmentResponse
)
async def create_assessment(
    student_id: int,
    data: AssessmentCreate,

    db: Annotated[
        AsyncSession,
        Depends(get_db)
    ],

    current_user: Annotated[
        User,
        Depends(get_current_user)
    ]
):
    student = await require_student_permission(
        db=db,
        user=current_user,
        student_id=student_id,
        permission="can_create_assessment"
    )

    assessment = Assessment(
        student_id=student.id,
        psychologist_id=current_user.id,
        **data.model_dump()
    )

    db.add(assessment)

    await db.commit()
    await db.refresh(assessment)

    return assessment


@router.get(
    "/student/{student_id}",
    response_model=list[AssessmentResponse]
)
async def get_assessments_by_student(
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

    result = await db.execute(
        select(Assessment)
        .where(
            Assessment.student_id == student.id
        )
        .order_by(
            Assessment.created_at.desc()
        )
    )

    assessments = result.scalars().all()

    return assessments