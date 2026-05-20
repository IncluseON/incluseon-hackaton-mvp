from fastapi import APIRouter,Depends,HTTPException,Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select,or_

from database import get_db
from security import verify_password,hash_password
from models.models import User
from schemas.user import UserCreate,UserResponse,UserUpdate,UserSearchResponse
from services.auth import check_user
from dependencies import get_current_user
from typing import Annotated

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)





@router.get(
    "/search",
    response_model=list[UserSearchResponse]
)
async def search_users(
    db: Annotated[
        AsyncSession,
        Depends(get_db)
    ],

    current_user: Annotated[
        User,
        Depends(get_current_user)
    ],

    search: str = Query(
        min_length=2
    )
):
    query = (
        select(User)
        .where(
            or_(
                User.name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%")
            )
        )
        .limit(10)
    )

    result = await db.execute(query)

    return result.scalars().all()   





@router.get("/me")
async def get_me(

    current_user: Annotated[
        User,
        Depends(get_current_user)
    ]
):

    return current_user




@router.post("",response_model=UserResponse)
async def create_user(data:UserCreate,db:AsyncSession=Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))

    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email já cadastrado"
        )
    
    password_hash = hash_password(data.password)

    user = User(
        name=data.name,
        email = data.email,
        password_hash = password_hash

    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user

@router.get("",response_model=list[UserResponse])
async def get_users(db:AsyncSession=Depends(get_db)):
    result = await db.execute(select(User))

    users = result.scalars().all()

    return users

@router.get("/{user_id}",response_model=UserResponse)
async def get_user_id(user_id:int,db:AsyncSession=Depends(get_db)):
    user = await db.get(User,user_id)

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Usuário não existe"
        )
    
    return user 

@router.patch("/{user_id}",response_model=UserResponse)
async def parcial_update_user(user_id:int,data:UserUpdate,db:AsyncSession=Depends(get_db)):
    user = await db.get(User,user_id)

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Usuário não existe"
        )
    

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():

        if key == "password":
            user.password_hash = hash_password(value)
        else:
            setattr(user,key,value)
   
       
    
    await db.commit()
    await db.refresh(user)

    return user




@router.delete("/{user_id}",response_model = UserResponse)
async def delete_user(user_id:int,db:AsyncSession=Depends(get_db)):
    user = await check_user(db,user_id)

    await db.delete(user)
    await db.commit()

        
    return user 

