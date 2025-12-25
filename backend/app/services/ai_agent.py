from app.config import settings
async def generate_fix(broken_query: str, drift_info: str):
    return {
        "sql": "CREATE VIEW users_patch AS SELECT u_id as user_id, email FROM users;",
        "explanation": "Detected column rename 'user_id' -> 'u_id'. Created alias view."
    }
