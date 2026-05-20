from fastapi import (
    APIRouter,
    Depends
)

from typing import Annotated

from models.models import User,UserRole



from permissions import (
    require_role
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)



@router.get("/dashboard")
async def admin_dashboard(

    current_user: Annotated[
        User,

        Depends(
            require_role([
                UserRole.ADMIN
            ])
        )
    ]
):

    return {
        "message":
        "Área administrativa"
    }