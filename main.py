import os
import requests

from requests.auth import HTTPBasicAuth

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens (domínios). Use uma lista de domínios específicos para maior segurança.
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.).
    allow_headers=["*"],  # Permite todos os cabeçalhos.
)

OPENSEARCH_URL = os.getenv("RDS_HOST", "https://api.opensearch-cluster01.lais.ufrn.br")
OPENSEARCH_USERNAME = os.getenv("RDS_USERNAME")
OPENSEARCH_PASSWORD = os.getenv("RDS_PASSWORD")

class OpenSearchQuery(BaseModel):
    url_path: str
    body: dict

@app.post("/search")
async def search_opensearch(query: OpenSearchQuery):
    try:
        full_url = f"{OPENSEARCH_URL}/{query.url_path}"
        
        response = requests.post(
            full_url,
            json=query.body,
            auth=HTTPBasicAuth(OPENSEARCH_USERNAME, OPENSEARCH_PASSWORD),
            headers={"Content-Type": "application/json"}
        )
        
        print(query.body)

        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

