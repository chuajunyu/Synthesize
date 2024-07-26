import json
import os

from dotenv import load_dotenv
from openai import OpenAI

from services.utils.system_prompt_templates import analysis_system_prompt_template, merge_system_prompt_template, chatbot_system_prompt_template
from services.utils.mock_responses import *

load_dotenv()


class OpenAiService:
    def __init__(self):
        self.client = OpenAI()

    def analyse_responses(self, business_context, formatted_responses):
        completion = self.client.chat.completions.create(
            response_format={ "type": "json_object" },
            model="gpt-4o",
            temperature=0.5,
            messages=[
                {"role": "system", "content": analysis_system_prompt_template % business_context},
                {"role": "user", "content": str(formatted_responses)}
            ]
        )
        return completion.choices[0].message.content
    
    def merge_insights(self, business_context, current_insights, new_insights):
        payload = {
            "CURRENT": current_insights,
            "NEW": new_insights
        }
        completion = self.client.chat.completions.create(
            response_format={ "type": "json_object" },
            model="gpt-4o",
            temperature=0.7,
            messages=[
                {"role": "system", "content": merge_system_prompt_template % business_context},
                {"role": "user", "content": json.dumps(payload)},
            ]
        )
        return completion.choices[0].message.content
    
    def get_chatgpt_response(self, history, business_context, form_description, information_goals, number_of_questions):
        messages=[
            {"role": "system", "content": chatbot_system_prompt_template.format(business_context=business_context, form_description=form_description, information_goals=information_goals, number_of_questions=number_of_questions)},
        ]
        if history:
            messages.extend(history)
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )
        return response.choices[0].message.content

if __name__ == "__main__":
    business_context = "We are McDonald's Fast Food Chain and we have just released a Truffle Cheese sauce dip for our nuggets. We want to assess whether customers like them"