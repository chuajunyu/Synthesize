from services.OpenAiService import OpenAiService
from services.FirebaseService import FirebaseService

class ChatBotService:
    def __init__(self, open_ai_service, firebase_service):
        self.open_ai_service = open_ai_service
        self.firebase_service = firebase_service
        self.chat_histories = {}
        self.final_message = (
            "<END> Thank you for your responses. This concludes our survey! <END>"
        )

    def get_assistant_response(self, user_id, form_id, project_id, business_context, form_description, information_goals, number_of_questions):
        if project_id not in self.chat_histories:
            self.chat_histories[project_id] = {}

        if form_id not in self.chat_histories[project_id]:
            self.chat_histories[project_id][form_id] = {}

        if user_id not in self.chat_histories[project_id][form_id]:
            self.chat_histories[project_id][form_id][user_id] = []

        history = self.chat_histories[project_id][form_id][user_id]
        response = self.open_ai_service.get_chatgpt_response(
            history,
            business_context,
            form_description,
            information_goals,
            number_of_questions,
        )
        self.chat_histories[project_id][form_id][user_id].append({"role": "assistant", "content": response})
        return response

    def update_chat_history(self, user_id, form_id, project_id, role, content):
        # Ensure project_id exists in chat_histories
        if project_id not in self.chat_histories:
            self.chat_histories[project_id] = {}

        # Ensure form_id exists under project_id
        if form_id not in self.chat_histories[project_id]:
            self.chat_histories[project_id][form_id] = {}

        # Ensure user_id exists under form_id
        if user_id not in self.chat_histories[project_id][form_id]:
            self.chat_histories[project_id][form_id][user_id] = []

        self.chat_histories[project_id][form_id][user_id].append({"role": role, "content": content})
        print(self.chat_histories[project_id][form_id][user_id])

    def get_response(self, user_id, form_id, project_id):
        response_data = self.firebase_service.get_cache_data(project_id, form_id)
        business_context = response_data["business_context"]
        form_description = response_data["form_description"]
        information_goals = response_data["information_goals"]
        number_of_questions = response_data["number_of_questions"]
        return self.get_assistant_response(
            user_id,
            form_id,
            project_id, 
            business_context,
            form_description,
            information_goals,
            number_of_questions,
        )

    def run_chatbot_step(self, user_id, form_id, project_id, user_message=""):
        if user_message:
            self.update_chat_history(user_id, form_id, project_id, "user", user_message)

        response = self.get_response(user_id, form_id, project_id)

        # Check if it's time for the final message
        if (len(self.chat_histories[project_id][form_id][user_id]) >= 9):  # Condition for ending the conversation
            self.update_chat_history(user_id, form_id, project_id, "assistant", self.final_message)
            return self.final_message
        return response

if __name__ == "__main__":
    open_ai_service = OpenAiService()
    firebase_service = FirebaseService()
    chatbot = ChatBotService(open_ai_service, firebase_service)
    print(chatbot)

    user_id = "user_1"
    form_id = "01"
    project_id = "01"
    followup = chatbot.get_response(user_id, form_id, project_id)

    for i in range(5):
        user_response = input(followup)
        chatbot.update_chat_history(user_id, form_id, project_id, "user", user_response)
        followup = chatbot.get_response(user_id, form_id, project_id)
