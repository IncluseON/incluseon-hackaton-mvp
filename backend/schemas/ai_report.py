from datetime import datetime
from pydantic import BaseModel


class AIReportResponse(BaseModel):
    id: int
    student_id: int
    report_type: str
    content: str
    pdf_path: str | None
    model_used: str | None
    prompt_tokens: int | None
    completion_tokens: int | None
    total_tokens: int | None
    created_at: datetime

    model_config = {
        "from_attributes": True
    }