from flask import Flask, request, jsonify, make_response
from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import SocketIO
from Vaunet.config import Config

app = Flask(__name__)
client = FusionAuthClient(Config.FUSION_TESTAPIKEY, Config.FUSION_LOCAL)


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/login', methods=['POST'])
def loginEndpoint():
    data = request.form.to_dict()
    user = data['user']
    password = data['password']
    user_login_request = {
        'loginId': user,
        'password': password,
        'applicationId': '2c61c7e6-79d1-4e66-8784-d06d9c65867e'
    }
    client_response = client.login(user_login_request)
    if client_response.was_successful():
        #print('success')
        success_response = client_response.success_response
        return success_response
    else:
        #print(client_response.error_response)
        return make_response(client_response.response.json(), 500)

@app.route('/registration', methods = ['POST'])
def registerEndpoint():
    data = request.json
    user = data.get('user')
    password = data.get('password')
    if user is None:
        return make_response(jsonify('No username specified'), 409)
    if password is None:
        return make_response(jsonify('No password specified'), 409)

    user_registration_request = {
        'registration': {
            'applicationId': '2c61c7e6-79d1-4e66-8784-d06d9c65867e',
        },
        'user': {
            'password': password,
            'firstName': 'test',
            'username': user
        }
    }
    client_response = client.register(user_registration_request)
    if client_response.was_successful():
        return client_response.success_response
    else:
        return client_response.response.json()

@app.route('/retrieveuser', methods = ['GET'])
def retrieveUser():
    data = request.headers
    jwt = data.get('token')
    validate = client.validate_jwt(jwt)
    if not validate.was_successful():
        return make_response(jsonify("Invalid token"), 401)
    client_response = client.retrieve_user_using_jwt(jwt)
    if client_response.was_successful():
        response = client_response.success_response
        return response, 200
    else:
        return make_response(jsonify('Invalid token'), 401)





if __name__ == '__main__':
    app.run()
