from pydantic import BaseModel, field_validator
from typing import List, Optional

class SearchQueryRequest(BaseModel):
    """
    Request model for search queries.

    Attributes:
        url_path (str): The URL path for the search query.
        body (dict): The body of the search query.
    """
    url_path: str
    body: dict

    @field_validator('url_path')
    def url_path_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('URL path is required')
        return v

    @field_validator('body')
    def body_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Body is required')
        return v

class DocumentSimilarityRequest(BaseModel):
    """
    Request model for finding similar documents.

    Attributes:
        index (str): The index to search in.
        doc_ids (List[str]): The document IDs to find similar documents for.
        fields (List[str]): The fields to consider for similarity.
        min_term_freq (Optional[int]): The minimum term frequency. Default is 1.
        max_query_terms (Optional[int]): The maximum number of query terms. Default is 25.
        min_doc_freq (Optional[int]): The minimum document frequency. Default is 1.
        max_doc_freq (Optional[int]): The maximum document frequency. Default is None.
        min_word_length (Optional[int]): The minimum word length. Default is 0.
        max_word_length (Optional[int]): The maximum word length. Default is None.
        stop_words (Optional[List[str]]): The stop words to exclude. Default is None.
        include_score (Optional[bool]): Whether to include the score in the response. Default is False.
    """
    index: str
    doc_ids: List[str]
    fields: List[str]
    min_term_freq: Optional[int] = 1
    max_query_terms: Optional[int] = 25
    min_doc_freq: Optional[int] = 1
    max_doc_freq: Optional[int] = None
    min_word_length: Optional[int] = 0
    max_word_length: Optional[int] = None
    stop_words: Optional[List[str]] = None
    include_score: Optional[bool] = False

    @field_validator('index')
    def index_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Index is required')
        return v

    @field_validator('doc_ids')
    def doc_ids_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Document IDs are required')
        return v

    @field_validator('fields')
    def fields_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Fields are required')
        return v
