import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, db

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')


class FirebaseService:
    def __init__(self):
        self.cred = credentials.Certificate('firebase_credentials.json')
        self.app = firebase_admin.initialize_app(self.cred, {
            'databaseURL': DATABASE_URL
        })
        self.db = db
        self.cache = {}

    def get_form_responses(self, formId):
        responses_ref = db.reference(f'responses/{formId}')
        return responses_ref.get()

    def get_unprocessed_responses(self, formId):
        unprocessed_responses_query = db.reference(f'responses/{formId}').order_by_child('processed').equal_to(False)
        return unprocessed_responses_query.get()

    def get_form(self, formId):
        forms_ref = db.reference(f'forms/{formId}')
        return forms_ref.get()

    def get_form_description(self, formId):
        form = self.get_form(formId)
        return form['description']

    def format_responses(self, form, responses):
        result = {}
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
            result[response_id] = (formatted_answer)
        return result

    def get_formatted_unprocessed_responses(self, formId):
        responses = self.get_unprocessed_responses(formId)
        print(responses)
        if responses is None or responses == {}:
            return []
        form = self.get_form(formId)
        if form is None:
            return []
        return self.format_responses(form, responses)

    def get_form_analysis(self, formId):
        analysis_ref = db.reference(f'analysis/{formId}')
        return analysis_ref.get()

    def get_analysis_last_updated_time(self, formId):
        form_analysis = self.get_form_analysis(formId)
        if form_analysis is None or not 'last_updated' in form_analysis:
            return 0
        return self.get_form_analysis(formId)['last_updated']

    def update_form_analysis(self, formId, analysis):
        analysis_ref = db.reference(f'analysis/{formId}')
        analysis_ref.set(analysis)
        return
    
    def set_form_response_processed(self, formId, responseId):
        response_ref = db.reference(f'responses/{formId}/{responseId}')
        response_ref.update({'processed': True})
        return
    
    def update_form_analysis_response_sentiments(self, formId, sentiments):
        for response_id in sentiments:
            analysis_ref = db.reference(f'analysis/{formId}/sentiments')
            analysis_ref.update({f'{response_id}': sentiments[response_id]})
        return
 
    def update_form_analysis_insights(self, formId, insights, last_updated):
        assert 'AGGREGATED_POSITIVE' in insights
        assert 'AGGREGATED_NEGATIVE' in insights
        assert 'AGGREGATED_SUGGESTIONS' in insights

        analysis_ref = db.reference(f'analysis/{formId}')
        analysis_data = analysis_ref.get()
        
        if 'insights' not in analysis_data:
            analysis_ref.set({'insights': {}})

        # Insights already exist, update them
        analysis_insights_ref = db.reference(f'analysis/{formId}/insights')
        analysis_insights_ref.update({'AGGREGATED_POSITIVE': insights['AGGREGATED_POSITIVE']})
        analysis_insights_ref.update({'AGGREGATED_NEGATIVE': insights['AGGREGATED_NEGATIVE']})

        final_suggestions = {}
        firebase_suggestions = analysis_data['insights'].get('AGGREGATED_SUGGESTIONS', {})
        generated_suggestions = insights['AGGREGATED_SUGGESTIONS']
        for suggestion in generated_suggestions:
            if suggestion not in firebase_suggestions:
                final_suggestions[suggestion] = generated_suggestions[suggestion]
                final_suggestions[suggestion]['viewed'] = False
                final_suggestions[suggestion]['open'] = True
                final_suggestions[suggestion]['lastUpdated'] = last_updated
            if suggestion in firebase_suggestions:
                final_suggestions[suggestion] = firebase_suggestions[suggestion]
                final_suggestions[suggestion]['viewed'] = firebase_suggestions[suggestion]['viewed']
                final_suggestions[suggestion]['open'] = firebase_suggestions[suggestion]['open']
                final_suggestions[suggestion]['lastUpdated'] = last_updated

        analysis_insights_ref.update({'AGGREGATED_SUGGESTIONS': final_suggestions})
        return
    
    def update_form_analysis_last_updated_time(self, formId, timestamp):
        analysis_ref = db.reference(f'analysis/{formId}')
        analysis_ref.update({'last_updated': timestamp})
        return

    def set_form_response_processed(self, formId, responseId):
        response_ref = db.reference(f'responses/{formId}/{responseId}')
        response_ref.update({'processed': True})
        return

    def update_form_analysis_response_sentiments(self, formId, sentiments):
        for response_id in sentiments:
            analysis_ref = db.reference(f'analysis/{formId}/sentiments')
            analysis_ref.update({f'{response_id}': sentiments[response_id]})
        return

    def update_form_analysis_last_updated_time(self, formId, timestamp):
        analysis_ref = db.reference(f'analysis/{formId}')
        analysis_ref.update({'last_updated': timestamp})
        return

    def get_business_context(self, project_id):
        business_context_ref = db.reference(f'projects/{project_id}')
        context = business_context_ref.get()['description']
        print(context)
        return context
    
    def get_form_description(self, form_id):
        form = self.get_form(form_id)
        return form['description']

    def get_form_information_goals(self, form_id):
        form = self.get_form(form_id)
        return form["informationGoals"]

    def get_form_number_of_questions(self, form_id):
        form = self.get_form(form_id)
        return form["numberOfQuestions"]

    def get_cache_data(self, project_id, form_id):
        if project_id not in self.cache:
            self.cache[project_id] = {}
        if form_id not in self.cache[project_id]:
            self.cache[project_id][form_id] = {}

        if not self.cache[project_id][form_id]:
            self.cache[project_id][form_id] = {
                "business_context": self.get_business_context(project_id),
                "form_description": self.get_form_description(form_id),
                "information_goals": self.get_form_information_goals(form_id),
                "number_of_questions": self.get_form_number_of_questions(form_id)
            }
        return self.cache[project_id][form_id]

if __name__ == "__main__":
    formId = '-NzEHrGgjqOKyNrbAQLi'
    test2 = '-O2Izql-Rp8o5qIHf86J'
    no = '-O2Izql-Rp8o5qIHf86J'
    firebase_service = FirebaseService()
    # print(firebase_service.get_form_responses(test2))
    print(firebase_service.get_form_analysis('asdfas'))
    # print(firebase_service.get_formatted_responses(formId))
    # print(firebase_service.get_form_description(no))
    # print(firebase_service.get_unprocessed_responses(0))
    # print(firebase_service.get_form_analysis(test2))
