import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME = "Aegis Backend"
    GCP_PROJECT = os.getenv("GCP_PROJECT", "hackathon-demo")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    DEMO_MODE = os.getenv("DEMO_MODE", "True").lower() == "true"
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

settings = Settings()
