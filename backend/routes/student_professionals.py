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
from sqlalchemy.orm import selectinload

from models.models import (
    User,
    Student,
    StudentProfessional
)

from schemas.student_professional import (
    StudentProfessionalCreate,
    StudentProfessionalUpdate,
    StudentProfessionalResponse
)

from services.permissions_service import (
    require_student_access
)


router = APIRouter(
    prefix="/students",
    tags=["Student Professionals"]
)

@router.get(
    "/{student_id}/professionals",
    response_model=list[StudentProfessionalResponse]
)
async def list_student_professionals(
    student_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    await require_student_access(
        db=db,
        user=current_user,
        student_id=student_id
    )

    result = await db.execute(
        select(StudentProfessional)
        .options(
            selectinload(StudentProfessional.user)
        )
        .where(
            StudentProfessional.student_id == student_id
        )
        .order_by(StudentProfessional.id.desc())
    )

    return result.scalars().all()


@router.post(
    "/{student_id}/professionals",
    response_model=StudentProfessionalResponse,
    status_code=status.HTTP_201_CREATED
)
async def add_student_professional(
    student_id: int,
    data: StudentProfessionalCreate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    student = await db.get(
        Student,
        student_id
    )

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aluno não encontrado"
        )

    if (
        student.psychologist_id != current_user.id
        and current_user.role != "admin"
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Sem permissão para vincular profissionais"
        )

    user_to_link = await db.get(
        User,
        data.user_id
    )

    if not user_to_link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário profissional não encontrado"
        )

    existing_result = await db.execute(
        select(StudentProfessional).where(
            StudentProfessional.student_id == student_id,
            StudentProfessional.user_id == data.user_id
        )
    )

    existing_link = existing_result.scalars().first()

    if existing_link:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este profissional já está vinculado a este aluno"
        )

    link = StudentProfessional(
        student_id=student_id,
        user_id=data.user_id,
        role_in_student=data.role_in_student,
        can_view=data.can_view,
        can_register_aba=data.can_register_aba,
        can_create_assessment=data.can_create_assessment,
        can_create_pei=data.can_create_pei,
        can_generate_ai_report=data.can_generate_ai_report,
        can_view_reports=data.can_view_reports
    )

    db.add(link)

    await db.commit()
    await db.refresh(link)

    result = await db.execute(
        select(StudentProfessional)
        .options(
            selectinload(StudentProfessional.user)
        )
        .where(
            StudentProfessional.id == link.id
        )
    )

    return result.scalars().first()


@router.patch(
    "/{student_id}/professionals/{link_id}",
    response_model=StudentProfessionalResponse
)
async def update_student_professional(
    student_id: int,
    link_id: int,
    data: StudentProfessionalUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    student = await db.get(
        Student,
        student_id
    )

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aluno não encontrado"
        )

    if (
        student.psychologist_id != current_user.id
        and current_user.role != "admin"
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Sem permissão para editar permissões"
        )

    result = await db.execute(
        select(StudentProfessional)
        .where(
            StudentProfessional.id == link_id,
            StudentProfessional.student_id == student_id
        )
    )

    link = result.scalar_one_or_none()

    if not link:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vínculo não encontrado"
        )

    update_data = data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            link,
            field,
            value
        )

    await db.commit()

    result = await db.execute(
        select(StudentProfessional)
        .options(
            selectinload(StudentProfessional.user)
        )
        .where(
            StudentProfessional.id == link_id
        )
    )

    updated_link = result.scalar_one()

    return updated_link



@router.delete(
    "/{student_id}/professionals/{link_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def remove_student_professional(
    student_id: int,
    link_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    await require_student_access(
        db=db,
        user=current_user,
        student_id=student_id
    )

    link = await db.get(
        StudentProfessional,
        link_id
    )

    if not link or link.student_id != student_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vínculo não encontrado"
        )

    await db.delete(link)
    await db.commit()