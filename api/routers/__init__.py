from fastapi import APIRouter
from .search_engine import mappings_router, general_router

router = APIRouter()
router.include_router(mappings_router, prefix="/search_engine")
router.include_router(general_router, prefix="/search_engine")
