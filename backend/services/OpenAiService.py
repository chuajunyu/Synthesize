import os
import json

from dotenv import load_dotenv
from openai import OpenAI

from utils.system_prompt_templates import analysis_system_prompt_template, merge_system_prompt_template
from utils.mock_responses import *

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
    
    def merge_suggestions(self, business_context, current_suggestions, new_suggestions):
        payload = {
            "CURRENT": current_suggestions,
            "NEW": new_suggestions
        }
        completion = self.client.chat.completions.create(
            response_format={ "type": "json_object" },
            model="gpt-4o",
            temperature=0.5,
            messages=[
                {"role": "system", "content": merge_system_prompt_template % business_context},
                {"role": "user", "content": json.dumps(payload)},
            ]
        )
        return completion.choices[0].message.content


if __name__ == "__main__":
    business_context = "We are McDonald's Fast Food Chain and we have just released a Truffle Cheese sauce dip for our nuggets. We want to assess whether customers like them"
    # content = json.dumps(mock_responses)
    # print(len(mock_responses["responses"]))
    open_ai_service = OpenAiService()
    # print(open_ai_service.analyse_responses(business_context, content))
    subway_business_context = "We are Subway, a sandwich shop, and we are looking to improve our sandwich making process"
    print(open_ai_service.merge_suggestions(subway_business_context, mock_current_suggestions, mock_new_suggestions))
