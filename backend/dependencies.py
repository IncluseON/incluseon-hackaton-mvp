from fastapi import Depends,HTTPException,status
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from security import decode_token,oauth2_scheme
from models.models import User,Student
from typing import Annotated


async def get_current_user(
        token:Annotated[str ,Depends(oauth2_scheme)],
        db:Annotated[AsyncSession,Depends(get_db)]
)-> User:
    user_id = decode_token(token)
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token Inválido"
        )
    
    user = await db.get(
        User,
        int(user_id)
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não encontrado"
        )
    
    return user


async def verify_student(db:Annotated[AsyncSession,Depends(get_db)],student_id:int):
    student = await db.get(Student,student_id)

    if not student:
        raise HTTPException(status_code=status.HTTP_302_FOUND,detail="Aluno não encontrado")
    
    return student
