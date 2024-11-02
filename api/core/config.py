import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings:
    app_name: str = "More Like This API"
    admin_email: str = "raphael_f@live.com"
    items_per_user: int = 50
    database_url: str = "sqlite:///./more-like-this.db"
    
    OPENSEARCH_URL = os.getenv("RDS_HOST")
    OPENSEARCH_USERNAME = os.getenv("RDS_USERNAME")
    OPENSEARCH_PASSWORD = os.getenv("RDS_PASSWORD")

    class Config:
        env_file = str(BASE_DIR / ".env")

settings = Settings()
