from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

from codeGenerator import codeGeneratorAgent
from hintGenerator import hintAgent
from randomCodeGenerator import randomCodeAgent
from pydantic import BaseModel


origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeResponseModel(BaseModel):
    question: str
    language: str = "Python"

class HintResponseModel(BaseModel):
    question: str

class RandomCodeGenerator(BaseModel):
    topic: str

@app.post('/agent/generateCode')
async def agent1(msg: CodeResponseModel):
    response = codeGeneratorAgent.invoke({"question": msg.question, "language": msg.language})
    return {"response": response}


@app.post('/agent/generateHint')
async def agent2(msg: HintResponseModel):
    response = hintAgent.invoke({"question": msg.question})
    return {"response": response}

@app.post('/agent/randomCode')
async def agent3(msg: RandomCodeGenerator):
    response = randomCodeAgent.invoke({"topic": msg.topic})
    return {"response": response}
