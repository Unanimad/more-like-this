from pydantic import BaseModel

class SearchQuery(BaseModel):
    url_path: str
    body: dict
