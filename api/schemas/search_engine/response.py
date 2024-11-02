from pydantic import BaseModel
from typing import List, Dict, Any

class DocumentSimilarityResponse(BaseModel):
    index: str
    doc_id: str
    similar_docs: List[Dict[str, Any]]
    score: float
