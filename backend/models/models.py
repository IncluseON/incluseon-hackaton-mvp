
from sqlalchemy.orm import Mapped, mapped_column,relationship
from sqlalchemy import String,Integer,Text,ForeignKey,Date,DateTime,Boolean
from database import Base
from sqlalchemy.dialects.postgresql import JSONB
from datetime import date,datetime
from enum import Enum
from sqlalchemy import Enum as SQLEnum




class AppointmentType(str, Enum):
    AEE = "aee"
    SCHOOL_SUPPORT = "school_support"
    CLASSROOM_OBSERVATION = "classroom_observation"
    FAMILY_MEETING = "family_meeting"
    PEDAGOGICAL_MEETING = "pedagogical_meeting"
    BEHAVIORAL_INTERVENTION = "behavioral_intervention"
    GUIDANCE = "guidance"
    OTHER = "other"


class AppointmentStatus(str, Enum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELED = "canceled"
    PENDING = "pending"



class UserRole(str, Enum):
    ADMIN = "admin"
    PSYCHOLOGIST = "psychologist"
    SUPERVISOR = "supervisor"
    AEE = "aee"
    SUPPORT_PROFESSIONAL = "support_professional"
    SCHOOL = "school"
    GUARDIAN = "guardian"




class StudentProfessionalRole(str, Enum):
    OWNER = "owner"
    AEE = "aee"
    SUPPORT = "support"
    PSYCHOLOGIST = "psychologist"
    SUPERVISOR = "supervisor"
    VIEWER = "viewer"




class StudentProfessional(Base):
    __tablename__ = "student_professionals"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id"),
        nullable=False,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    role_in_student: Mapped[StudentProfessionalRole] = mapped_column(
        SQLEnum(
            StudentProfessionalRole,
            name="student_professional_roles"
        ),
        nullable=False
    )

    can_view: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    can_register_aba: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    can_create_assessment: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    can_create_pei: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    can_generate_ai_report: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    can_view_reports: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    student: Mapped["Student"] = relationship(
        back_populates="professionals"
    )

    user: Mapped["User"] = relationship(
        back_populates="student_links"
    )




class User(Base):
    __tablename__ = "users"

    id:Mapped[int] = mapped_column(Integer,primary_key=True,index=True)

    name:Mapped[str] = mapped_column(String(255),nullable=False)

    email:Mapped[str] = mapped_column(String(255),unique=True,nullable=False,index=True)

    password_hash: Mapped[str]= mapped_column(String(255),nullable=False)

    student_links: Mapped[list["StudentProfessional"]] = relationship(
    back_populates="user",
    cascade="all, delete-orphan"
)

    students: Mapped[list["Student"]] = relationship(back_populates="psychologist",cascade="all, delete-orphan")

    role: Mapped[UserRole] = mapped_column(
    SQLEnum(
        UserRole,
        name="user_roles",
        values_callable=lambda enum_cls: [item.value for item in enum_cls],
    ),
    default=UserRole.PSYCHOLOGIST,
    nullable=False
)
    
    appointments: Mapped[list["Appointment"]] = relationship(
    back_populates="professional",
    cascade="all, delete-orphan"
)
    



class Student(Base):

    __tablename__ = "students"


    id: Mapped[int] = mapped_column(
        primary_key=True
    )
    age:Mapped[int] =mapped_column(Integer,nullable=True)
    psychologist_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    psychologist: Mapped["User"] = relationship(
        back_populates="students"
    )

    birth_date:Mapped[int] = mapped_column(Integer,nullable=False)

    name: Mapped[str] = mapped_column(
        String(255)
    )

    birth_date: Mapped[date] = mapped_column(
        Date
    )

    diagnosis: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )


    school_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )


    guardian_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    guardian_phone: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True
    )

    communication_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    sensory_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    general_observations: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )


    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )


    behavior_records: Mapped[
    list["BehaviorRecord"]] = relationship(
    back_populates="student",
    cascade="all, delete-orphan"
)
    professionals: Mapped[list["StudentProfessional"]] = relationship(
    back_populates="student",
    cascade="all, delete-orphan"
)
    

    assessments: Mapped[
    list["Assessment"]
] = relationship(
    cascade="all, delete-orphan"
)
    strengths: Mapped[str | None]

    learning_profile: Mapped[str | None]

    preferred_reinforcers: Mapped[str | None]

    sensory_triggers: Mapped[str | None]

    communication_style: Mapped[str | None]

    emotional_regulation_notes:Mapped[str | None]

    appointments: Mapped[list["Appointment"]] = relationship(
    back_populates="student",
    cascade="all, delete-orphan"
)


    


class BehaviorRecord(Base):

    __tablename__ = "behavior_records"

    # =====================================
    # PRIMARY KEY
    # =====================================

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    # =====================================
    # RELATIONSHIP
    # =====================================

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id")
    )

    student: Mapped["Student"] = relationship(
        back_populates="behavior_records"
    )

    # =====================================
    # ABA RECORD
    # =====================================

    antecedent: Mapped[str] = mapped_column(
        Text
    )

    behavior: Mapped[str] = mapped_column(
        Text
    )

    consequence: Mapped[str] = mapped_column(
        Text
    )

    # =====================================
    # INTERVENTION
    # =====================================

    strategy_used: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    strategy_effective: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True
    )

    # =====================================
    # CONTEXT
    # =====================================

    environment: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    people_present: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # =====================================
    # METRICS
    # =====================================

    intensity: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    duration_minutes: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    # =====================================
    # FUNCTIONAL ANALYSIS
    # =====================================

    function_hypothesis: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # =====================================
    # OBSERVATIONS
    # =====================================

    observations: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )




class Assessment(Base):

    __tablename__ = "assessments"

    # =====================================
    # PRIMARY KEY
    # =====================================

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    # =====================================
    # RELATIONSHIPS
    # =====================================

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id")
    )

    psychologist_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    student: Mapped["Student"] = relationship()

    psychologist: Mapped["User"] = relationship()

    # =====================================
    # BASIC INFO
    # =====================================

    title: Mapped[str] = mapped_column(
        String(255)
    )

    assessment_type: Mapped[str] = mapped_column(
        String(100)
    )

    # =====================================
    # FLEXIBLE DATA
    # =====================================

    assessment_data: Mapped[dict] = mapped_column(
        JSONB
    )

    # =====================================
    # TIMESTAMPS
    # =====================================

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


class AIReport(Base):
    __tablename__ = "ai_reports"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id"),
        nullable=False
    )

    created_by_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    report_type: Mapped[str] = mapped_column(
        String(100),
        default="case_study"
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    pdf_path: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    model_used: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    prompt_tokens: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    completion_tokens: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    total_tokens: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id"),
        nullable=False,
        index=True
    )

    professional_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    appointment_type: Mapped[AppointmentType] = mapped_column(
        SQLEnum(
            AppointmentType,
            name="appointment_types"
        ),
        nullable=False
    )

    status: Mapped[AppointmentStatus] = mapped_column(
        SQLEnum(
            AppointmentStatus,
            name="appointment_statuses"
        ),
        default=AppointmentStatus.SCHEDULED,
        nullable=False
    )

    scheduled_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )

    objective: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    observations: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    next_steps: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    student: Mapped["Student"] = relationship(
        back_populates="appointments"
    )

    professional: Mapped["User"] = relationship(
        back_populates="appointments"
    )