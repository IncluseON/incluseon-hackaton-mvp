from fastapi import (
    APIRouter,
    Depends,
    Query
)

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from typing import Annotated

from datetime import datetime

from database import get_db

from dependencies import get_current_user

from services.permissions_service import (
    require_student_permission,
    require_student_access
)

from models.models import (
    User,
    BehaviorRecord
)

from schemas.behavior_record import (
    BehaviorRecordCreate,
    BehaviorRecordResponse
)


router = APIRouter(
    prefix="/behavior-records",
    tags=["Behavior Records"]
)


@router.post(
    "/student/{student_id}",
    response_model=BehaviorRecordResponse
)
async def create_behavior_record(
    student_id: int,
    data: BehaviorRecordCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    student = await require_student_permission(
        db=db,
        user=current_user,
        student_id=student_id,
        permission="can_register_aba"
    )

    record = BehaviorRecord(
        student_id=student.id,
        **data.model_dump()
    )

    db.add(record)

    await db.commit()
    await db.refresh(record)

    return record


@router.get(
    "/student/{student_id}",
    response_model=list[BehaviorRecordResponse]
)
async def get_behavior_records(
    student_id: int,

    db: Annotated[
        AsyncSession,
        Depends(get_db)
    ],

    current_user: Annotated[
        User,
        Depends(get_current_user)
    ],

    page: int = Query(
        default=1,
        ge=1
    ),

    per_page: int = Query(
        default=20,
        ge=1,
        le=100
    ),

    min_intensity: int | None = Query(
        default=None,
        ge=1,
        le=10
    ),

    max_intensity: int | None = Query(
        default=None,
        ge=1,
        le=10
    ),

    start_date: datetime | None = Query(
        default=None
    ),

    end_date: datetime | None = Query(
        default=None
    )
):
    student = await require_student_access(
        db=db,
        user=current_user,
        student_id=student_id
    )

    query = select(
        BehaviorRecord
    ).where(
        BehaviorRecord.student_id == student.id
    )

    if min_intensity is not None:
        query = query.where(
            BehaviorRecord.intensity >= min_intensity
        )

    if max_intensity is not None:
        query = query.where(
            BehaviorRecord.intensity <= max_intensity
        )

    if start_date is not None:
        query = query.where(
            BehaviorRecord.created_at >= start_date
        )

    if end_date is not None:
        query = query.where(
            BehaviorRecord.created_at <= end_date
        )

    query = query.order_by(
        BehaviorRecord.created_at.desc()
    )

    offset = (page - 1) * per_page

    query = query.offset(
        offset
    ).limit(
        per_page
    )

    result = await db.execute(
        query
    )

    records = result.scalars().all()

    return records