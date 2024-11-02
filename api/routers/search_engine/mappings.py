import requests
from fastapi import APIRouter, HTTPException, Query
from typing import List
from core.config import settings
from utils import make_request

router = APIRouter()

@router.get("/mappings")
async def get_mappings(indices: List[str] = Query(None, description="Indices names")):
    """
    Get the mappings for the specified indices.

    Args:
        indices (List[str]): A list of index names to get mappings for.

    Returns:
        dict: A dictionary containing the mappings for each index.

    Raises:
        HTTPException: If the indices parameter is not provided or if there is an error in the request.
    """
    if not indices:
        raise HTTPException(status_code=400, detail="Indices parameter is required")
    
    mappings = {}
    for index in indices:
        full_url = f"{settings.OPENSEARCH_URL}/{index}/_mapping"
        response = make_request("GET", full_url)
        if response.status_code == 200:
            mappings[index] = response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)
    
    return mappings
