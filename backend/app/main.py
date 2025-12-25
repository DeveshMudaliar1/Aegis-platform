import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chaos, remediate
from app.config import settings

app = FastAPI(title="Aegis API")

origins_regex = r"https://.*\.run\.app|http://localhost:\d+"

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=origins_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chaos.router)
app.include_router(remediate.router)

@app.get("/")
def health_check():
    return {"status": "Aegis Online", "mode": "DEMO_MODE" if settings.DEMO_MODE else "PROD"}
