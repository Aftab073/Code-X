from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import os

from utils.executor import execute_python_code

app = FastAPI()

# CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Model
class CodeRequest(BaseModel):
    language: str
    code: str
    input: str = ""

@app.post("/run")
async def run_code(req: CodeRequest):
    if req.language != "python":
        return {"output": "Only Python is supported right now."}
    
    output = execute_python_code(req.code, req.input)
    return {"output": output}
