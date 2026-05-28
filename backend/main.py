from fastapi import FastAPI
from routes.users import router as user_router
from routes.auth import router as auth_router
from routes.students import router as student_router
from routes.ai import router as ai_router
from routes.behavior_record import router as behavior_router
from routes.assessments import router as assessments_router
from database import engine,Base
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import (
    StaticFiles
)
from routes.timeline import router as timeline_router
from routes.analytics import router as analytics_router
from routes.tasks import router as tasks_router
from routes.ai_reports import router as ai_reports_router
from routes.ai_usage import router as ai_usage_router
from routes.student_professionals import router as student_professionals_router
from routes.appointments import router as appointments_router





@asynccontextmanager
async def lifespan(_app:FastAPI):
    yield

    await engine.dispose()




app = FastAPI(title="NeuroAcompanhamento API",lifespan=lifespan)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/reports",

    StaticFiles(
        directory="generated_reports"
    ),

    name="reports"
)

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(student_router)
app.include_router(behavior_router)
app.include_router(assessments_router)
app.include_router(ai_router)
app.include_router(timeline_router)
app.include_router(analytics_router)
app.include_router(tasks_router)
app.include_router(ai_reports_router)
app.include_router(ai_reports_router)
app.include_router(ai_usage_router)
app.include_router(student_professionals_router)
app.include_router(appointments_router)


@app.get("/")
async def root():
    return{"message":"Api Funcionando"}