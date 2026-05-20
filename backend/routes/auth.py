from fastapi import APIRouter, Depends,HTTPException,status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from security import create_access_token,verify_password,create_refresh_token,decode_token

from models.models import User
from schemas.token import Token,RefreshTokenRequest
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login")
async def login(form_data:OAuth2PasswordRequestForm=Depends(),db:AsyncSession=Depends(get_db)):
    result = await db.execute(select(User).where(User.email == form_data.username))

    user = result.scalar_one_or_none()
 
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos"
        )
    
    valid_password = verify_password(form_data.password,user.password_hash)
    print(valid_password)

    if not valid_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos"
        )
    
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    return Token(access_token=access_token,refresh_token=refresh_token,token_type="bearer")




@router.post("/refresh")
async def refresh_access_token(
    data: RefreshTokenRequest
):

    payload = decode_token(
        data.refresh_token
    )

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )

    # =====================================
    # TOKEN TYPE CHECK
    # =====================================

    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )

    user_id = payload.get("sub")

    new_access_token = (
        create_access_token(
            int(user_id)
        )
    )

    return {
        "access_token":
        new_access_token,

        "token_type":
        "bearer"
    }