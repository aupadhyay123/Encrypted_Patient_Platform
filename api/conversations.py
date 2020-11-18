from flask import request, Blueprint
from .db.conversation_dao import ConversationDAO
from flask_cors import cross_origin
from .app import db
conversation_blueprint = Blueprint('conversations', __name__)
conversation_dao = ConversationDAO()

@conversation_blueprint.route('/conversation/exists', methods=['POST'])
@cross_origin()
def does_conversation_exist():
    data = request.json
    print(data)
    user1 = data['user1']
    user2 = data['user2']
    if conversation_dao.does_conversation_exist(db, user1, user2):
        return {'results': 'True', 'success': True, 'status': 200}, 200
    else:
        return {'results': 'False', 'success': True, 'status': 200}, 200

@conversation_blueprint.route('/conversation', methods=['POST'])
@cross_origin()
def create_conversation():
    data = request.json
    user1 = data['user1']
    user2 = data['user2']
    secret_key = data['secret_key']
    key = []
    for s in secret_key:
        key.append(secret_key[s])
    str_key = ','.join(str(x) for x in key)
    create_response = conversation_dao.create_conversation(db, user1, user2, str_key)
    return create_response, create_response['status']

@conversation_blueprint.route('/conversation/retrieve', methods=['POST'])
@cross_origin()
def get_conversation():
    data = request.json
    user1 = data['user1']
    user2 = data['user2']
    get_response = conversation_dao.get_conversation(db, user1, user2)
    return get_response, get_response['status']

@conversation_blueprint.route('/conversation/getall', methods=['POST'])
@cross_origin()
def get_all_conversations_by_user():
    data = request.json
    user1 = data['user']
    get_response = conversation_dao.get_all_conversations_for_user(db, user1)
    return get_response, get_response['status']