import os
import json

from dotenv import load_dotenv
from openai import OpenAI

from services.utils.system_prompt_template import system_prompt_template
from services.utils.mock_responses import mock_responses

load_dotenv()


class OpenAiService:
    def __init__(self):
        self.client = OpenAI()

    def analyse_responses(self, business_context, formatted_responses):
        completion = self.client.chat.completions.create(
            response_format={ "type": "json_object" },
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt_template % business_context},
                {"role": "user", "content": str(formatted_responses)}
            ]
        )
        return completion.choices[0].message.content


if __name__ == "__main__":
    business_context = "We are McDonald's Fast Food Chain and we have just released a Truffle Cheese sauce dip for our nuggets. We want to assess whether customers like them"
    content = json.dumps(mock_responses)
    open_ai_service = OpenAiService()
    print(open_ai_service.analyse_responses(business_context, content))
