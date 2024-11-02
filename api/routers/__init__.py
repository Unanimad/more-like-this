from fastapi import APIRouter
from .search_engine import router as search_engine_router 

router = APIRouter()

router.include_router(search_engine_router)
