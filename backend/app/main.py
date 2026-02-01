from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.routers import auth, attendance

app = FastAPI(title="SSSMS HRMS API", 
              description="SSSMS Human Resource Management System API",
              version="1.0.0")

# ✅ 1. Add root endpoint
@app.get("/")
async def root():
    return JSONResponse({
        "service": "SSSMS HRMS API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": {
            "documentation": "/docs",
            "alternative_docs": "/redoc",
            "health": "/health",
            "api_base": "/api/v1"
        }
    })

# ✅ 2. Add health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": "2024-02-01T19:25:00Z"}

# ✅ 3. CORS CONFIGURATION (Update with your frontend URL)
origins = [
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:5173",  # Vite dev server
    "https://hrms-one-self.vercel.app",
    "https://hrms-pe6c.onrender.com",  # Your own API
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 4. ROUTERS
app.include_router(auth.router, prefix="/api/v1", tags=["Authentication"])
app.include_router(attendance.router, prefix="/api/v1", tags=["Attendance"])

# ✅ 5. Add custom 404 handler
@app.exception_handler(404)
async def not_found_exception_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "message": f"The requested URL {request.url.path} was not found",
            "available_endpoints": {
                "root": "/",
                "health": "/health",
                "docs": "/docs",
                "api_v1_base": "/api/v1",
                "login": "/api/v1/auth/login"
            }
        }
    )