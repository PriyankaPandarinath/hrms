from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.auth import LoginRequest
from app.services.auth_service import authenticate_user
from app.core.database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    result = authenticate_user(db, payload.email, payload.password)
    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    return result
# app/routers/auth.py
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()

# Handle OPTIONS method for CORS preflight
@router.options("/login")
async def options_login():
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    )

@router.post("/login")
async def login():
    # Your login logic
    pass