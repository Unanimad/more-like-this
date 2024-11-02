from fastapi import APIRouter, HTTPException
from core.config import settings
from utils import make_request

router = APIRouter()

REQUIRED_CLUSTER_PERMISSIONS = [
    "cluster:monitor/state",
    "cluster:monitor/stats"
]

REQUIRED_INDICES_PERMISSIONS = [
    "indices:monitor/settings/get",
    "indices:monitor/stats",
    "indices:admin/mappings/get"
]

@router.get("/roles/{username}")
async def check_user_roles(username: str):
    """
    Check the roles and permissions of a user in OpenSearch.

    Args:
        username (str): The username to check roles for.

    Returns:
        dict: A dictionary containing the user's roles and whether they have the required permissions.

    Raises:
        HTTPException: If the user is not found or if there is an error in the request.
    """
    full_url = f"{settings.OPENSEARCH_URL}/_security/user/{username}"
    
    response = make_request("GET", full_url)
    
    if response.status_code == 200:
        user_info = response.json()
        if username in user_info:
            roles = user_info[username].get("roles", [])
            return {
                "roles": roles,
                "has_required_permissions": check_permissions(roles)
            }
        else:
            raise HTTPException(status_code=404, detail="User not found")
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

def check_permissions(roles):
    return {
        "cluster_permissions": all(perm in roles for perm in REQUIRED_CLUSTER_PERMISSIONS),
        "indices_permissions": all(perm in roles for perm in REQUIRED_INDICES_PERMISSIONS)
    }
