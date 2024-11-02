from fastapi import APIRouter, HTTPException
from core.config import settings
from schemas.search_engine.request import SearchQueryRequest
from utils import make_request

router = APIRouter()

@router.post("/search")
async def search(query: SearchQueryRequest):
    full_url = f"{settings.OPENSEARCH_URL}/{query.url_path}"
    
    response = make_request("POST", full_url, json=query.body)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)
