import os
from dotenv import load_dotenv
from datetime import datetime

from fastapi import FastAPI, Response, status

from services.OpenAiService import OpenAiService
from services.FirebaseService import FirebaseService

load_dotenv()
app = FastAPI()
open_ai_service = OpenAiService()
firebase_service = FirebaseService()

@app.get("/")
async def root():
    return {"message": "Hello World", "time": str(datetime.now())}

@app.get("/get_form_analysis/{formId}", status_code=status.HTTP_200_OK)
async def get_form_analysis(formId: str, response: Response, secret: str | None = None):
    if secret != os.environ['SECRET_KEY']:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"message": "Invalid secret key"}
    
    # Return Cache if the analysis was updated within the last hour
    unix_time_now = int(datetime.timestamp(datetime.now()))
    last_updated_time = int(firebase_service.get_analysis_last_updated_time(formId))
    if unix_time_now - last_updated_time <= 3600:
        return {"message": "Form analysis updated recently", "content": firebase_service.get_form_analysis(formId)}

    formatted_responses = firebase_service.get_formatted_responses(formId)
    business_context = firebase_service.get_form_description(formId)
    analysis = eval(open_ai_service.analyse_responses(business_context, formatted_responses))
    analysis['last_updated'] =  unix_time_now
    firebase_service.update_form_analysis(formId, analysis)
    return {"message": "Form analysis completed", "content": analysis}
