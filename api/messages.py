from flask import request, Blueprint
from .db.messaging_dao import MessagingDAO
from flask_cors import cross_origin
from .app import db
messaging_blueprint = Blueprint('messages', __name__)
messaging_dao = MessagingDAO()


@messaging_blueprint.route('/messages', methods=['POST'])
@cross_origin()
def create_message():
    data = request.json
    conversation_id = int(data['conversation_id'])
    user = data['user']
    message = data['message']
    create_response = messaging_dao.create_message(db, conversation_id, user, message)
    return create_response, create_response['status']

@messaging_blueprint.route('/messages/all', methods=['POST'])
@cross_origin()
def get_all_messages_for_convo():
    data = request.json
    conversation_id = int(data['conversation_id'])
    get_response = messaging_dao.get_conversation(db, conversation_id)
    dates = get_response['results']
    print(dates[0][4], type(dates[0][4]))
    sorted_dates = sorted(dates, key=lambda i: i[4], reverse=True)
    get_response['results'] = sorted_dates
    return get_response, get_response['status']