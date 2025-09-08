from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

from codeGenerator import codeGeneratorAgent
from hintGenerator import hintAgent
from randomCodeGenerator import randomCodeAgent
from AIinterviewPrep import interviewAgent
from InterviewFeedback import feedbackAgent
from pydantic import BaseModel
from uuid import uuid4
import subprocess, io
from typing import List
import json
import re

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

class InterviewPrepModel(BaseModel):
    role: str
    user_preference: str

class VoiceInterviewerModel(BaseModel):
    question: str

class FeedbackInterviewModel(BaseModel):
    questions: List[str]
    answers: List[str]

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

@app.post('/agent/ai-interview')
async def agent4(msg: InterviewPrepModel):
    response = interviewAgent.invoke({"role": msg.role, "user_preference": msg.user_preference})
    return {"response": response}

@app.post('/agent/question-voice')
def agent5(msg: VoiceInterviewerModel):
    question = msg.question
    MODEL_PATH = "voices/en_GB-alba-medium.onnx"

    cmd = [
        "/opt/anaconda3/envs/myenv/bin/piper",
        "--model", MODEL_PATH,
        "--output_file", "-"
    ]

    process = subprocess.Popen(
        cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )

    audio_bytes, err = process.communicate(input=question.encode())

    if process.returncode != 0:
        raise RuntimeError(f"Piper failed: {err.decode()}")
    

    subprocess.run(cmd, input=question.encode(), check=True)
    return StreamingResponse(io.BytesIO(audio_bytes), media_type="audio/wav")

@app.post('/agent/interview-feedback')
async def agent6(msg: FeedbackInterviewModel):
    try:    
        questions = msg.questions
        answers = msg.answers
        agent_response = feedbackAgent.invoke({"questions": questions, "answers": answers})
        cleaned = re.sub(r"^```(json)?", "", agent_response.strip(), flags=re.IGNORECASE)
        cleaned = re.sub(r"```$", "", cleaned.strip())
        # print("output:", agent_response)

        response = json.loads(cleaned)
        return {"feedback": response["feedback"], "score": int(response["score"]), "recommendations": response["recommendations"]}
    except Exception as e:
        print(e)