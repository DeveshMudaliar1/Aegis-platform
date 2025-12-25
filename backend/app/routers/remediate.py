from fastapi import APIRouter
from app.schemas import PatchRequest, PatchResponse
from app.services.ai_agent import generate_fix

router = APIRouter()

@router.post("/generate-patch", response_model=PatchResponse)
async def create_patch(request: PatchRequest):
    fix = await generate_fix(request.broken_query, request.schema_drift)
    return PatchResponse(
        sql_patch=fix['sql'],
        explanation=fix['explanation']
    )
