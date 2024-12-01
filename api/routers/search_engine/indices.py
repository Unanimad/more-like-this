from fastapi import APIRouter, HTTPException
from api.schemas.search_engine.request import DocumentSimilarityRequest
from api.schemas.search_engine.response import DocumentSimilarityResponse
from api.utils import make_request
from api.core.config import settings

router = APIRouter(tags=["Indices"])

@router.get("/indices")
def list_indices():
    """
    Return a list of all indices from Search Engine, sorted by index name.

    This endpoint fetches the list of indices from the Search Engine instance
    specified in the settings. The indices are sorted by their names before
    being returned.

    Returns:
        list: A list of index names sorted alphabetically.

    Raises:
        HTTPException: If the request to OpenSearch fails, an HTTPException
        is raised with the status code and error message from OpenSearch.
    """
    full_url = f"{settings.OPENSEARCH_URL}/_cat/indices?v&format=json&s=index"
    response = make_request("GET", full_url)

    if response.status_code == 200:
        prefix = settings.SEARCH_ENGINE_INDEX_PREFIX
        indices = sorted([index['index'] for index in response.json()])
        if prefix:
            indices = [index for index in indices if index.startswith(prefix)]
        return indices
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

@router.post("/more-like-this")
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
    likes = [{"_id": doc_id} for doc_id in request.doc_ids]
    fields = request.fields


    body = {
        "query": {
            "more_like_this": {
                "fields": fields,
                "like": likes,
                # "min_term_freq": request.min_term_freq,
                # "max_query_terms": request.max_query_terms,
                # "min_doc_freq": request.min_doc_freq,
                # "max_doc_freq": request.max_doc_freq,
                # "min_word_length": request.min_word_length,
                # "max_word_length": request.max_word_length,
                # "stop_words": request.stop_words,
            }
        }
    }

    full_url = f"{settings.OPENSEARCH_URL}/{request.index}/_search"
    response = make_request(
        "POST",
        full_url,
        json=body
    )
    breakpoint()
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response)

