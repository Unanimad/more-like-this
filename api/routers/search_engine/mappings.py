import requests
from fastapi import APIRouter, HTTPException, Query
from typing import List
from requests.auth import HTTPBasicAuth
from core.config import settings

router = APIRouter()

@router.get("/mappings")
async def get_mappings(indices: List[str] = Query(None, description="Indices names")):
    if not indices:
        raise HTTPException(status_code=400, detail="Indices parameter is required")
    
    mappings = {}
    for index in indices:
        full_url = f"{settings.OPENSEARCH_URL}/{index}/_mapping"
        response = requests.get(
            full_url,
            auth=HTTPBasicAuth(settings.OPENSEARCH_USERNAME, settings.OPENSEARCH_PASSWORD),
            headers={"Content-Type": "application/json"}
        )
        if response.status_code == 200:
            mappings[index] = response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)
    
    return mappings
