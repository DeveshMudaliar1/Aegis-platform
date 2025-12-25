from app.config import settings
def inject_bq_chaos(table_name: str):
    return {"status": "simulated"}
