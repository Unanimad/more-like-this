from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def setup_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Permite todas as origens (domínios). Use uma lista de domínios específicos para maior segurança.
        allow_credentials=True,
        allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.).
        allow_headers=["*"],  # Permite todos os cabeçalhos.
    )
