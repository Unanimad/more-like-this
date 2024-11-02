from pydantic import BaseModel
from typing import List, Optional

class SearchQuery(BaseModel):
    url_path: str
    body: dict


class DocumentSimilarityRequest(BaseModel):
    index: str
    doc_ids: Optional[List[str]] = None
    fields: Optional[List[str]] = None
    min_term_freq: Optional[int] = 1
    max_query_terms: Optional[int] = 25
    min_doc_freq: Optional[int] = 1
    max_doc_freq: Optional[int] = None
    min_word_length: Optional[int] = 0
    max_word_length: Optional[int] = None
    stop_words: Optional[List[str]] = None
    include_score: Optional[bool] = False
