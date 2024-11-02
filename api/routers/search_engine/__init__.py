from .mappings import router as mappings_router
from .general import router as general_router
from .roles import router as roles_router

from fastapi import APIRouter

router = APIRouter(prefix="/search_engine")

router.include_router(mappings_router)
router.include_router(general_router)
router.include_router(roles_router)