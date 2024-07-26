import requests

# Define the endpoint URL
url = "http://127.0.0.1:8000/chat"

# Initial greeting
initial_payload = {
    "user_id": "user_2",
    "form_id": "01",
    "project_id": "01",
    "message": "",  # Initial greeting
}

response = requests.post(url, json=initial_payload)
print(response.json())

# Simulate subsequent interactions
followup_payload = {
    "user_id": "user_2",
    "form_id": "01",
    "project_id": "01",
    "message": "Some of the games I play are laggy.",
}

response = requests.post(url, json=followup_payload)
print(response.json())

# Simulate subsequent interactions
followup_payload = {
    "user_id": "user_2",
    "form_id": "01",
    "project_id": "01",
    "message": "It happens quite often, in almost every other game. It affects my user experience. Usually its because the frame rate is too high or there are too many coins. ",
}

response = requests.post(url, json=followup_payload)
print(response.json())

# Simulate subsequent interactions
followup_payload = {
    "user_id": "user_2",
    "form_id": "01",
    "project_id": "01",
    "message": "Interested in new skins that are priced cheaper - too expensive as I am a student",
}

response = requests.post(url, json=followup_payload)
print(response.json())

# Another interaction
another_payload = {
    "user_id": "user_2",
    "form_id": "01",
    "project_id": "01",
    "message": "Looking for prices between $1 - $3.",
}

response = requests.post(url, json=another_payload)
print(response.json())
