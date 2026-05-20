from pwdlib import PasswordHash
from datetime import datetime,timedelta,UTC
from jose import jwt,JWTError
from fastapi.security import OAuth2PasswordBearer

from config import settings

password_hash = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)



def hash_password(password:str) -> str:
    return password_hash.hash(password)

def verify_password(plain_password:str,hashed_password:str) -> str:
    return password_hash.verify(plain_password,hashed_password)


def create_access_token(
        user_id:int
):
    expire = datetime.now(UTC) + timedelta(
        days=settings.access_token_expire_minutes
    )

    payload = {
        "sub": str(user_id),
        "type": "refresh",
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.secret_key.get_secret_value(),
        algorithm=settings.algorithm
    )

def create_refresh_token(user_id: int):

    expire = datetime.now(UTC) + timedelta(
        days=settings.refresh_token_expire_days
    )

    payload = {
        "sub": str(user_id),
        "type": "refresh",
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.secret_key.get_secret_value(),
        algorithm=settings.algorithm
    )

def decode_token(token:str):
    try:
        payload = jwt.decode(
            token,
            settings.secret_key.get_secret_value(),
            algorithms=[settings.algorithm]
        )
        
        return payload.get("sub")
    except JWTError:
        return None
