from datetime import datetime
from pydantic import BaseModel


class TimelineItem(BaseModel):
    type: str
    title: str
    description: str
    created_at: datetime
    metadata: dict | None = None