from fastapi import FastAPI

from api.core.middleware import setup_middleware
from api.routers import router

# uvicorn api.main:app --reload
app = FastAPI()

setup_middleware(app)

app.include_router(router)