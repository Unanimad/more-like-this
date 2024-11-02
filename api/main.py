from fastapi import FastAPI

from core.middleware import setup_middleware
from routers import router

# uvicorn main:app --reload
app = FastAPI()

setup_middleware(app)

app.include_router(router)