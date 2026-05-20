from models.models import User
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

async def check_user(db:AsyncSession,user_id:int) -> User:
    user = await db.get(User,user_id)

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Usuário não existe"
        )
    return user