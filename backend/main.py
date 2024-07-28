import os
from dotenv import load_dotenv
from datetime import datetime

from fastapi import FastAPI, Response, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from services.OpenAiService import OpenAiService
from services.FirebaseService import FirebaseService
from services.ChatBotService import ChatBotService

from pydantic import BaseModel

from typing import Optional

load_dotenv()
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://synthesize-git-develop-jun-yus-projects.vercel.app",
    "https://synthesize-git-develop-jun-yus-projects.vercel.app/*",
    "https://synthesize-two.vercel.app",
    "https://synthesize-two.vercel.app/*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserMessage(BaseModel):
    user_id: str
    form_id: str
    project_id: str
    message: Optional[str] = None  # message is optional

open_ai_service = OpenAiService()
firebase_service = FirebaseService()
chatbot_service = ChatBotService(open_ai_service, firebase_service)

@app.get("/")
async def root():
    return {"message": "Hello World", "time": str(datetime.now())}

@app.get("/get_form_analysis/{formId}", status_code=status.HTTP_200_OK)
async def get_form_analysis(formId: str, response: Response, secret: str | None = None):
    if secret != os.environ['SECRET_KEY']:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"message": "Invalid secret key"}

    # Return what is in the Firebase if the analysis was updated within the 10 minutes
    unix_time_now = int(datetime.timestamp(datetime.now()))
    last_updated_time = int(firebase_service.get_analysis_last_updated_time(formId))
    if unix_time_now - last_updated_time <= 600:
        return {"message": "Form analysis updated recently", "content": firebase_service.get_form_analysis(formId)}

    # Only run if there are any unprocessed responses
    formatted_responses = firebase_service.get_formatted_unprocessed_responses(formId)

    if formatted_responses == [] or formatted_responses is None:
        past_content = firebase_service.get_form_analysis(formId)
        if past_content:
            response.status_code = status.HTTP_200_OK
            return {"message": "Form analysis already completed", "content": past_content}
        else:
            response.status_code = status.HTTP_204_NO_CONTENT
            return {"message": "No unprocessed responses found", "content": []}

    # Process the new responses
    business_context = firebase_service.get_form_description(formId)
    openai_response = open_ai_service.analyse_responses(business_context, formatted_responses)
    new_analysis = eval(openai_response)

    # Append everything in the intermediate analysis to firebase
    firebase_service.update_form_analysis_response_sentiments(formId, new_analysis["INTERMEDIATE"])

    # Merge the positive / negative sentiments and suggestions
    past_analysis = firebase_service.get_form_analysis(formId)
    if past_analysis and past_analysis.get("insights", None) is not None:
        past_insights = past_analysis.get("insights", None)
        merged_insights = eval(open_ai_service.merge_insights(business_context, past_insights, new_analysis["FINAL"]))["FINAL"]
    else:
        merged_insights = new_analysis["FINAL"]

    # Update the insights on the firebase accordingly
    firebase_service.update_form_analysis_insights(formId, merged_insights)

    # Set responses as processed
    processed_responses = [response_id for response_id in formatted_responses]
    for response_id in processed_responses:
        firebase_service.set_form_response_processed(formId, response_id)

    # Update the last updated time
    firebase_service.update_form_analysis_last_updated_time(formId, unix_time_now)

    final_analysis = firebase_service.get_form_analysis(formId)
    return {"message": "Form analysis completed", "content": final_analysis}


@app.post("/chat/{projectId}/{formId}", status_code=status.HTTP_200_OK)
async def chat_endpoint(user_message: UserMessage):
    try:
        response = chatbot_service.run_chatbot_step(
            user_message.user_id,
            user_message.form_id,
            user_message.project_id,
            user_message.message or "",
        )
        return {"response": response}
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise e

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
