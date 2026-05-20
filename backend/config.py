from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from datetime import timedelta

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )
    database_url : str
    secret_key : SecretStr
    access_token_expire_minutes : int = 60
    algorithm :str =  "HS256"
    refresh_token_expire_days : int = 7
    openai_api_key:str
    





settings = Settings()