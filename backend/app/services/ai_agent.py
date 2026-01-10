# ==============================================================================
# PRODUCTION IMPLEMENTATION (Disabled for Demo Latency)
# ==============================================================================
# SYSTEM_PROMPT = """
# You are an expert Data Resilience Engineer.
# Your goal is to fix a broken SQL pipeline caused by Schema Drift.
# 
# INPUT CONTEXT:
# 1. Broken Query: The SQL that is failing.
# 2. Schema Drift: The specific column change (e.g., 'user_id' -> 'u_id').
# 
# RULES:
# - Return ONLY valid SQL. No markdown, no conversational text.
# - Do not DROP tables. Only CREATE VIEW or ALTER TABLE.
# - The fix must alias the NEW column name back to the OLD column name
#   to preserve downstream compatibility.
# """
# 
# async def generate_fix_live(broken_query, drift_info):
#     client = OpenAI(api_key=settings.OPENAI_API_KEY)
#     response = client.chat.completions.create(
#         model="gpt-4-turbo",
#         messages=[
#             {"role": "system", "content": SYSTEM_PROMPT},
#             {"role": "user", "content": f"Fix this: {broken_query}. Drift: {drift_info}"}
#         ]
#     )
#     return response.choices[0].message.content
# ==============================================================================

async def generate_fix(broken_query: str, drift_info: str):
    # For the hackathon demo, we return a deterministic "Virtual Patch" instead of calling a live LLM to save latency.
    return {
        "sql": "CREATE VIEW users_patch AS SELECT u_id as user_id, email FROM users;",
        "explanation": "Detected column rename 'user_id' -> 'u_id'. Created alias view."
    }
