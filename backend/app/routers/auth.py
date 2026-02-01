# app/routers/auth.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: Optional[int] = None
    email: str

@router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    User login endpoint.
    
    Example request:
    {
        "email": "admin@ssspl.com",
        "password": "your_password"
    }
    """
    print(f"Login attempt for: {request.email}")
    
    # TODO: Add your actual authentication logic here
    if request.email == "admin@ssspl.com" and request.password == "admin123":
        return LoginResponse(
            access_token="dummy_jwt_token_for_testing",
            token_type="bearer",
            user_id=1,
            email=request.email
        )
    
    raise HTTPException(
        status_code=401,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

# Add a test endpoint
@router.get("/auth/test")
async def test_auth():
    return {"message": "Auth router is working!"}