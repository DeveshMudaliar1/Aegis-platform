from fastapi import APIRouter
from app.schemas import ChaosRequest, ChaosResponse
from app.services.vix_calc import calculate_vix
from app.services.bigquery import inject_bq_chaos

router = APIRouter()

@router.post("/inject-chaos", response_model=ChaosResponse)
async def trigger_chaos(request: ChaosRequest):
    inject_bq_chaos(request.target_table)
    new_vix = calculate_vix(10, 4)
    return ChaosResponse(
        message=f"Chaos Injected: {request.target_table} altered.",
        vix_score=new_vix,
        infected_nodes=["Revenue_Dashboard", "Churn_Model", "Exec_Report"]
    )
