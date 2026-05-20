from pydantic import BaseModel, EmailStr,Field,ConfigDict
from models.models import UserRole


class UserBase(BaseModel):
    name:str
    email:EmailStr



class UserCreate(UserBase):
    password:str


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id:int
    role:UserRole


class UserUpdate(UserBase):
    name: str | None = None
    email: EmailStr | None = None 
    password: str | None = None




class UserSearchResponse(BaseModel):
    id: int
    name: str
    email: str
    role: UserRole

    model_config = {
        "from_attributes": True
    }