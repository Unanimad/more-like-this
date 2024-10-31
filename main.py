import os
import requests

from typing import List

from requests.auth import HTTPBasicAuth

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

# uvicorn main:app --reload

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
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@app.get("/cursos")
async def cursos(nomes: str = Query(..., description="Nome do curso")):
    try:
        full_url = f"{OPENSEARCH_URL}/avasusbr__curso/_search"
        
        nomes_list = nomes.split(',')
        should_clauses = [{"match": {"nome": nome.strip()}} for nome in nomes_list]
        
        body = {
            "query": {
                "bool": {
                    "should": should_clauses
                }
            }
        }
        
        response = requests.post(
            full_url,
            json=body,
            auth=HTTPBasicAuth(OPENSEARCH_USERNAME, OPENSEARCH_PASSWORD),
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/recomendacoes")
async def get_recomendacoes(campos: List[str] = Query(..., description="Lista dos campos"), ids: List[str] = Query(..., description="Lista de IDs dos cursos")):
    try:
        likes = [{"_index": "avasusbr__curso", "_id": curso_id} for curso_id in ids[0].split(",")]
        campos = campos[0].split(",")

        if not likes:
            raise HTTPException(status_code=400, detail="Nenhum curso encontrado para recomendar")

        body = {
            "query": {
                "more_like_this": {
                    "fields": campos,
                    "like": likes,
                    "min_term_freq": 1,
                    "max_query_terms": 12
                }
            }
        }

        full_url = f"{OPENSEARCH_URL}/avasusbr__curso/_search"
        response = requests.post(
            full_url,
            json=body,
            auth=HTTPBasicAuth(OPENSEARCH_USERNAME, OPENSEARCH_PASSWORD),
            headers={"Content-Type": "application/json"}
        )

        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
