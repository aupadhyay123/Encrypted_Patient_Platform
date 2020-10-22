from flask import request, Blueprint
from .db.conversation_dao import ConversationDAO
from flask_cors import cross_origin
from .app import db
conversation_blueprint = Blueprint('conversations', __name__)
conversation_dao = ConversationDAO()

@conversation_blueprint.route('/conversation/exists', methods=['GET'])
@cross_origin()
def does_conversation_exist():
    data = request.json
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
    nonce = data['nonce']
    create_response = conversation_dao.create_conversation(db, user1, user2, secret_key, nonce)
    return create_response, create_response['status']

@conversation_blueprint.route('/conversation', methods=['GET'])
@cross_origin()
def get_conversation():
    data = request.json
    user1 = data['user1']
    user2 = data['user2']
    get_response = conversation_dao.get_conversation(db, user1, user2)
    return get_response, get_response['status']