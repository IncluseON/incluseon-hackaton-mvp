from datetime import datetime

from pydantic import BaseModel,ConfigDict


# =====================================
# BASE
# =====================================

class BehaviorRecordBase(BaseModel):

    antecedent: str
    behavior: str
    consequence: str

    strategy_used: str | None = None
    strategy_effective: bool | None = None

    environment: str | None = None
    people_present: str | None = None

    intensity: int | None = None
    duration_minutes: int | None = None

    function_hypothesis: str | None = None

    observations: str | None = None


# =====================================
# CREATE
# =====================================

class BehaviorRecordCreate(
    BehaviorRecordBase
):
    pass


# =====================================
# UPDATE
# =====================================

class BehaviorRecordUpdate(
    BaseModel
):

    antecedent: str | None = None
    behavior: str | None = None
    consequence: str | None = None

    strategy_used: str | None = None
    strategy_effective: bool | None = None

    environment: str | None = None
    people_present: str | None = None

    intensity: int | None = None
    duration_minutes: int | None = None

    function_hypothesis: str | None = None

    observations: str | None = None


# =====================================
# RESPONSE
# =====================================

class BehaviorRecordResponse(
    BehaviorRecordBase
):
    model_config = ConfigDict(from_attributes=True)
    id: int
    student_id: int
    created_at: datetime

    