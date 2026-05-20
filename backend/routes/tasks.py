from fastapi import APIRouter

from celery.result import AsyncResult

from workers.celery_app import (
    celery
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.get("/{task_id}")
async def get_task_status(
    task_id: str
):

    task = AsyncResult(
        task_id,
        app=celery
    )

    # =====================================
    # FAILURE
    # =====================================

    if task.failed():

        return {

            "task_id": task.id,

            "status": "FAILURE",

            "error": str(task.result)
        }

    # =====================================
    # SUCCESS
    # =====================================

    if task.ready():

        result = task.result

        return {

            "task_id": task.id,

            "status": task.status,

            "report":
            result["report"],

            "pdf_url":
            f"/reports/{task.id}.pdf"
        }

    # =====================================
    # PENDING
    # =====================================

    return {

        "task_id": task.id,

        "status": task.status,

        "report": None,

        "pdf_url": None
    }