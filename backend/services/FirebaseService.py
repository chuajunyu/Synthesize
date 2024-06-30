import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')


class FirebaseService:
    def __init__(self):
        self.cred = credentials.Certificate('firebase_credentials.json')
        self.app = firebase_admin.initialize_app(self.cred, {
            'databaseURL': DATABASE_URL
        })
        self.db = db

    def get_form_responses(self, formId):
        responses_ref = db.reference(f'responses/{formId}')
        return responses_ref.get()

    def get_form(self, formId):
        forms_ref = db.reference(f'forms/{formId}')
        return forms_ref.get()
    
    def get_form_description(self, formId):
        form = self.get_form(formId)
        return form['description']

    def format_responses(self, form, responses):
        result = []
        questions = form["questions"]
        questionsList = list()

        for question in questions:
            questionsList.append(question['text'])

        for response_id in responses:
            response = responses[response_id]
            answers = response['answers']
        
            formatted_answer = {}
            for i, answer in enumerate(answers):
                formatted_answer[i] = {f'question{i}': questionsList[i], f'response{i}': answer['response']}
            
            result.append(formatted_answer)

        return result
    
    def get_formatted_responses(self, formId):
        responses = self.get_form_responses(formId)
        form = self.get_form(formId)
        return self.format_responses(form, responses)
    
    def get_form_analysis(self, formId):
        analysis_ref = db.reference(f'analysis/{formId}')
        return analysis_ref.get()

    def get_analysis_last_updated_time(self, formId):
        if self.get_form_analysis(formId) is None:
            return 0
        return self.get_form_analysis(formId)['last_updated']
    
    def update_form_analysis(self, formId, analysis):
        analysis_ref = db.reference(f'analysis/{formId}')
        analysis_ref.set(analysis)
        return


if __name__ == "__main__":
    # formId = '-NzEHrGgjqOKyNrbAQLi'
    firebase_service = FirebaseService()
    # print(firebase_service.get_formatted_responses(formId))
    # print(firebase_service.get_form_description(formId))

    print(firebase_service.get_form_analysis('sdfafds'))
    print(firebase_service.get_analysis_last_updated_time('asdfas'))
    firebase_service.update_form_analysis('asdfas', {'test': 'test'})
