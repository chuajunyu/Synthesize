import os
from openai import OpenAI
from dotenv import load_dotenv
import json
from system_prompt_template import system_prompt_template
from mock_responses import mock_responses

load_dotenv()
client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

business_context = "We are Lola's cafe. We serve Burgers, pastas & breakfast dishes with a modern, gourmet twist offered in a laid-back atmosphere."
system_prompt = system_prompt_template % business_context

content = json.dumps(mock_responses)

completion = client.chat.completions.create(
  response_format={ "type": "json_object" },
  model="gpt-4o",
  messages=[
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": content}
  ]
)

print(completion.choices[0].message)
print(completion.choices[0].message.content)


# print('{\n\t"aggregated_positive": {\n\t\t"positive1": "Excellent quality of food",\n\t\t"positive2": "Good quality of service",\n\t\t"positive3": "Enjoyable atmosphere",\n\t\t"positive4": "Delicious dishes enjoyed by customers"\n\t},\n\t"aggregated_negative": {\n\t\t"negative1": "Poor quality of food",\n\t\t"negative2": "Unpleasant atmosphere",\n\t\t"negative3": "Long wait time for food",\n\t\t"negative4": "Crowded environment affecting experience",\n\t\t"negative5": "Noise level disturbing"\n\t},\n\t"aggregated_suggestions": {\n\t\t"suggestion1": {\n\t\t\t"Actionable": "Ensure consistent high quality of food",\n\t\t\t"Rationale": "Maintaining excellent food quality will keep customers satisfied and returning."\n\t\t},\n\t\t"suggestion2": {\n\t\t\t"Actionable": "Enhance the atmosphere to make it more inviting",\n\t\t\t"Rationale": "Creating an enjoyable atmosphere contributes to an overall positive dining experience."\n\t\t},\n\t\t"suggestion3": {\n\t\t\t"Actionable": "Address wait times for food service",\n\t\t\t"Rationale": "Reducing wait times can improve customer satisfaction and experience."\n\t\t},\n\t\t"suggestion4": {\n\t\t\t"Actionable": "Manage crowd capacity to avoid discomfort",\n\t\t\t"Rationale": "A less crowded environment can lead to a more relaxed and enjoyable dining experience."\n\t\t},\n\t\t"suggestion5": {\n\t\t\t"Actionable": "Implement noise control measures",\n\t\t\t"Rationale": "Reducing noise levels can create a more pleasant dining environment for customers."\n\t\t},\n\t\t"suggestion6": {\n\t\t\t"Actionable": "Expand vegan and dessert options on the menu",\n\t\t\t"Rationale": "Increasing menu variety caters to diverse customer preferences and enhances overall experience."\n\t\t},\n\t\t"suggestion7": {\n\t\t\t"Actionable": "Train staff to provide attentive service",\n\t\t\t"Rationale": "Improving service quality ensures customers feel valued and cared for during their visit."\n\t\t},\n\t\t"suggestion8": {\n\t\t\t"Actionable": "Monitor and maintain an optimal noise level",\n\t\t\t"Rationale": "Maintaining a comfortable noise level promotes a relaxing dining atmosphere for patrons."\n\t\t}\n\t}\n}')