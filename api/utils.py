import requests
from requests.auth import HTTPBasicAuth
from core.config import settings

def make_request(method: str, url: str, **kwargs):
    response = requests.request(
        method,
        url,
        auth=HTTPBasicAuth(settings.OPENSEARCH_USERNAME, settings.OPENSEARCH_PASSWORD),
        headers={"Content-Type": "application/json"},
        **kwargs
    )
    return response
