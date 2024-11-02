from fastapi import APIRouter, HTTPException
from schemas.search_engine.request import DocumentSimilarityRequest
from schemas.search_engine.response import DocumentSimilarityResponse
from utils.make_request import make_request
from core.config import settings

router = APIRouter()

@router.post("/more-like-this", response_model=DocumentSimilarityResponse)
async def more_like_this(request: DocumentSimilarityRequest):
    """
    Find documents similar to the given document IDs based on the specified fields.

    Args:
        request (DocumentSimilarityRequest): The request object containing the index, document IDs, fields, and other optional parameters.

    Returns:
        DocumentSimilarityResponse: The response object containing the index, document ID, and similar documents.

    Raises:
        HTTPException: If no documents are found to recommend or if there is an error in the request.
    """
    likes = [{"_index": request.index, "_id": doc_id} for doc_id in request.doc_ids]
    fields = request.fields

    body = {
        "query": {
            "more_like_this": {
                "fields": fields,
                "like": likes,
                "min_term_freq": request.min_term_freq,
                "max_query_terms": request.max_query_terms,
                "min_doc_freq": request.min_doc_freq,
                "max_doc_freq": request.max_doc_freq,
                "min_word_length": request.min_word_length,
                "max_word_length": request.max_word_length,
                "stop_words": request.stop_words,
                "include_score": request.include_score
            }
        }
    }

    full_url = f"{settings.OPENSEARCH_URL}/{request.index}/_search"
    response = make_request(
        "POST",
        full_url,
        json=body
    )

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

