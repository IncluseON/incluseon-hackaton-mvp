from pydantic import BaseModel


class AIUsageResponse(BaseModel):
    used_this_month: int
    monthly_limit: int
    remaining: int