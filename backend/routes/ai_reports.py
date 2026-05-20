from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from typing import Annotated

from database import get_db

from dependencies import get_current_user

from models.models import (
    User,
    UserRole,
    AIReport
)

from schemas.ai_report import AIReportResponse

from services.permissions_service import (
    require_student_access,
    get_student_professional_link
)


router = APIRouter(
    prefix="/ai-reports",
    tags=["AI Reports"]
)


@router.get(
    "/student/{student_id}",
    response_model=list[AIReportResponse]
)
async def list_student_ai_reports(
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

    if (
        current_user.role != UserRole.ADMIN
        and student.psychologist_id != current_user.id
    ):
        link = await get_student_professional_link(
            db=db,
            user_id=current_user.id,
            student_id=student.id
        )

        if not link:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Você não está vinculado a este aluno."
            )

        if not (
            link.can_view_reports
            or link.can_generate_ai_report
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Você não tem permissão para visualizar relatórios deste aluno."
            )

    result = await db.execute(
        select(AIReport)
        .where(
            AIReport.student_id == student.id
        )
        .order_by(
            AIReport.created_at.desc()
        )
    )

    reports = result.scalars().all()

    return reports