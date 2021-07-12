from typing import List, Optional, Dict

from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()


class RepBody(BaseModel):
    response: str


class ReqBody(BaseModel):
    service: str
    method: str
    kwargs: Dict



@app.get("/")
async def get():
    return {"Hello": "This is BayLi"}


@app.post("/api", response_model=RepBody)
async def post(req: ReqBody):
    print(req)
    return {"response": "I'm BayLi"}