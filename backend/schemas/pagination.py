from pydantic import BaseModel
from typing import Generic, TypeVar


class PaginationParams(BaseModel):

    page: int = 1
    per_page: int = 20





T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    per_page: int