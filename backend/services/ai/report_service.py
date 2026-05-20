from sqlalchemy import select

from models.models import (
    Assessment,BehaviorRecord
)

from services.ai.prompt_builder import (
    build_case_study_prompt
)

from services.ai.providers.openai_provider import (
    generate_text
)



async def generate_case_study(

    student,

    db
):

    # =====================================
    # ASSESSMENTS
    # =====================================

    assessments_result = await db.execute(
        select(Assessment).where(
            Assessment.student_id
            == student.id
        )
    )

    assessments = (
        assessments_result
        .scalars()
        .all()
    )

    # =====================================
    # BEHAVIOR RECORDS
    # =====================================

    behavior_result = await db.execute(
        select(BehaviorRecord).where(
            BehaviorRecord.student_id
            == student.id
        )
    )

    behavior_records = (
        behavior_result
        .scalars()
        .all()
    )

    # =====================================
    # PROMPT
    # =====================================

    prompt = build_case_study_prompt(
        student_name=student.name,

        assessments=assessments,

        behavior_records=
        behavior_records,

        analytics={}
    )

    # =====================================
    # GENERATE
    # =====================================

    response = await generate_text(
        prompt
    )

    return response