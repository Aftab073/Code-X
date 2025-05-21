from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uuid
import os
import re
from typing import Optional
from utils.executor import execute_python_code
import logging
from datetime import datetime
import platform

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Python Code Execution API",
    description="API for executing Python code in a secure sandbox environment",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class CodeRequest(BaseModel):
    language: str
    code: str
    input: Optional[str] = ""

class ExecutionResponse(BaseModel):
    output: str
    execution_time: Optional[float] = None
    error: bool = False
    timestamp: str = datetime.now().isoformat()

# Security checks
BLACKLISTED_PATTERNS = [
    r"os\.system\(",
    r"subprocess\.",
    r"open\(",
    r"import\s+os\s*$",
    r"import\s+subprocess\s*$",
    r"__import__\(",
    r"eval\(",
    r"exec\(",
    r"import\s+ctypes",
    r"import\s+sys\s*$"
]

def validate_code_security(code: str) -> bool:
    """Check for potentially dangerous code patterns"""
    for pattern in BLACKLISTED_PATTERNS:
        if re.search(pattern, code, re.MULTILINE):
            return False
    return True

@app.post("/run", response_model=ExecutionResponse)
async def run_code(req: CodeRequest, request: Request):
    """Execute Python code in a secure environment"""
    
    # Security validation
    if not validate_code_security(req.code):
        logger.warning(f"Blocked potentially dangerous code from {request.client.host}")
        raise HTTPException(
            status_code=400,
            detail="Code contains potentially dangerous operations"
        )
    
    if req.language.lower() != "python":
        return JSONResponse(
            status_code=400,
            content={
                "output": "Only Python is supported right now",
                "error": True
            }
        )
    
    # Execute the code
    try:
        start_time = datetime.now()
        output = execute_python_code(req.code, req.input)
        execution_time = (datetime.now() - start_time).total_seconds()
        
        error = "❌" in output  # Simple error detection
        
        return {
            "output": output,
            "execution_time": execution_time,
            "error": error
        }
        
    except Exception as e:
        logger.error(f"Execution error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Execution failed: {str(e)}"
        )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "timestamp": datetime.now().isoformat()}
    )