import os
from dotenv import load_dotenv
from fastapi import FastAPI, Response, status
from services.OpenAiService import OpenAiService
from services.FirebaseService import FirebaseService

load_dotenv()
app = FastAPI()
open_ai_service = OpenAiService()
firebase_service = FirebaseService()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/get_form_analysis/{formId}", status_code=200)
async def get_form_analysis(formId: str, response: Response, secret: str | None = None):
    if secret != os.environ['SECRET_KEY']:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"message": "Invalid secret key"}
    formatted_responses = firebase_service.get_formatted_responses(formId)
    business_context = firebase_service.get_form_description(formId)
    analysis = open_ai_service.analyse_responses(business_context, formatted_responses)
    return {"message": "Form analysis completed", "content": analysis}
