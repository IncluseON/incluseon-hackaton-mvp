from pydantic import BaseModel,ConfigDict
from datetime import date,datetime

class StudentBase(BaseModel):

    name: str
    age:int | None = None
    birth_date: date
    diagnosis: str | None = None

    school_name: str | None = None

    guardian_name: str | None = None
    guardian_phone: str | None = None

    communication_notes: str | None = None
    sensory_notes: str | None = None
    general_observations: str | None = None



class StudentUpdate(BaseModel):

    name: str | None = None
    birth_date: date | None = None

    diagnosis: str | None = None

    school_name: str | None = None

    guardian_name: str | None = None
    guardian_phone: str | None = None

    communication_notes: str | None = None
    sensory_notes: str | None = None
    general_observations: str | None = None




class StudentCreate(StudentBase):
    pass





class StudentResponse(StudentBase):
    model_config = ConfigDict(from_attributes=True)
    
    id:int
    psychologist_id:int
    created_at:datetime