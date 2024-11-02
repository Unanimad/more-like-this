import requests
from fastapi import APIRouter, HTTPException, Query
from requests.auth import HTTPBasicAuth
from core.config import settings
from schemas.search_engine import SearchQuery

router = APIRouter()

@router.post("/search")
async def search(query: SearchQuery):
    full_url = f"{settings.OPENSEARCH_URL}/{query.url_path}"
    
    response = requests.post(
        full_url,
        json=query.body,
        auth=HTTPBasicAuth(settings.OPENSEARCH_USERNAME, settings.OPENSEARCH_PASSWORD),
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)
