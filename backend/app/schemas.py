from pydantic import BaseModel
from typing import List

class ChaosRequest(BaseModel):
    target_table: str
    chaos_type: str = "column_rename"

class ChaosResponse(BaseModel):
    message: str
    vix_score: float
    infected_nodes: List[str]

class PatchRequest(BaseModel):
    broken_query: str
    schema_drift: str

class PatchResponse(BaseModel):
    sql_patch: str
    explanation: str
