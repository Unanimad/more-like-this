from fastapi import APIRouter
from .search_engine import mappings_router, general_router, roles_router

router = APIRouter(prefix="/search_engine")

router.include_router(mappings_router)
router.include_router(general_router)
router.include_router(roles_router)
