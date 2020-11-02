from flask import Flask, request, jsonify, make_response, render_template, redirect, url_for
from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import SocketIO, send
from .config import Config
#from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
import shortuuid
import jwt
import datetime
from functools import wraps
from cryptography.fernet import Fernet

# ...app config...
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Qaz1234mko'
app.config['MYSQL_DB'] = 'vaunect'
app.config['MYSQL_HOST'] = 'localhost'
app.config['CORS_HEADERS'] = "Content-Type"

app.config['SECRET-KEY'] = 'thisisthesecretkey'

db = MySQL(app)
from .conversations import conversation_blueprint
app.register_blueprint(conversation_blueprint)

#conversation_dao = ConversationDAO(db)

f = open("secret_key.key", "r")
key = f.readline()
encrypt_key = Fernet(key)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token') #https:localhost:5000/route?token=afj203qfw0aef

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET-KEY'])
            print(data)
        except:
            return jsonify({'message': 'Token is invalid'}), 403

        return f(*args, **kwargs)

    return decorated


@app.route('/unprotected')
def unprotected():
    return jsonify({'message': 'Anyone can view this!'})


@app.route('/protected')
@token_required
def protected():
    return jsonify({'message': 'This is only available for people with valid tokens.'})


@socketio.on('message')
def message_received(msg):
    print(msg)
    send(msg, broadcast=True, include_self=False)
    return None



@app.route("/register", methods=["POST"])
@cross_origin()
def register():
    req = request.get_json()
    print(req)
    user_id = shortuuid.ShortUUID().random(length=40)
    username = req.get('username')
    first_name = req.get('first_name')
    last_name = req.get('last_name')
    email = req.get('email')
    phone = req.get('phone')
    password = req.get('password')
    cursor = db.connection.cursor()
    check_if_unique_user = '''SELECT * FROM users where username = %s or email = %s'''
    values = (username, email)
    cursor.execute(check_if_unique_user, values)
    results = cursor.fetchall()

    if len(results) == 0:
        byte_version = bytes(first_name, 'utf-8')
        first_name = encrypt_key.encrypt(byte_version)
        print(first_name)
        print(len(first_name))

        byte_version= bytes(last_name, 'utf-8')
        last_name = encrypt_key.encrypt(byte_version)

        byte_version=bytes(email, 'utf-8')
        email = encrypt_key.encrypt(byte_version)

        byte_version=bytes(password, 'utf-8')
        password = encrypt_key.encrypt(byte_version)

        byte_version=bytes(phone, 'utf-8')
        phone = encrypt_key.encrypt(byte_version)

        register_statement = """INSERT INTO users (user_id, username, first_name, last_name, email, phone, 
                                password) VALUES (%s, %s, %s, %s, %s, %s, %s);"""
        values = (user_id, username, first_name, last_name, email, phone, password)
        cursor.execute(register_statement, values)
        db.connection.commit()
        return jsonify("registration:valid"), 200
    else:
        return jsonify("email or username is already being used"), 400


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    req = request.get_json()

    username = str(req.get('username'))
    password = req.get('password')

    login_statement = "SELECT * FROM users WHERE username= %s"

    cursor = db.connection.cursor()
    cursor.execute(login_statement, [username])
    results = cursor.fetchall()
    if len(results) == 1:
        password_check = encrypt_key.decrypt(bytes(results[0][6], 'utf-8')).decode('utf-8')
        if(password_check == password):
            token = jwt.encode({
                'user': username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }, app.config['SECRET-KEY'])
                
            return jsonify(user_id=results[0][0],login=True, token=token.decode('UTF-8')), 200

        else:
            return jsonify(login=False), 400
    return jsonify(login=False), 400

@app.route("/search", methods=["POST"])
@cross_origin()
def search():
    print("Attempting to search for user")
    req = request.get_json()

    query = req.get('query')
    user = req.get('user')

    search_statement = f"""SELECT username FROM users 
                            WHERE username LIKE \"%{query}%\"
                            AND username != \"{user}\";"""

    cursor = db.connection.cursor()
    cursor.execute(search_statement)
    results = cursor.fetchall()

    results_list = []
    for i in results:
        user = {}
        user['username'] = i[0]
        results_list.append(user)

    return jsonify({'success':'ok','results':results_list}), 200


@app.route('/user', methods=['POST'])
@cross_origin()
def get_user():
    print('retrieving user information')
    req = request.get_json()

    user_id = req.get('user_id')
    user_statement = f"SELECT username, first_name, last_name FROM users WHERE user_id={user_id}"

    cursor = db.connection.cursor()
    cursor.execute(user_statement)
    results = cursor.fetchall()
    print(results)

    if len(results) == 1:
        return jsonify({"success":"ok"}), 200


@app.route('/friends', methods=['POST'])
@cross_origin()
def friends():
    print(f'retrieving friends for user')
    req = request.get_json()

    user = req.get('user')
    friends_statement = f"SELECT user1, user2 FROM friends WHERE user1=\"{user}\" OR user2=\"{user}\";"

    cursor = db.connection.cursor()
    cursor.execute(friends_statement)
    results = cursor.fetchall()

    results_list = []
    for i in results:
        if i[0] == user:
            results_list.append(i[1])
        else:
            results_list.append(i[0])

    return jsonify({
        'success': 'ok',
        'friends': results_list,
    }), 200

@app.route('/update-friends', methods=['POST', 'DELETE'])
@cross_origin()
def update_friends():
    print('updating friend request')
    if request.method == 'POST':
        pass
    elif request.method == 'DELETE':
        pass


@app.route('/friend-requests', methods=['POST'])
@cross_origin()
def friend_requests():
    print('retrieving friend requests for user')
    req = request.get_json()

    user = req.get('user')
    requests_statement = f"SELECT friend_request_id, sender_id FROM friend_requests WHERE receiver_id=\"{user}\";"

    cursor = db.connection.cursor()
    cursor.execute(requests_statement)
    results = cursor.fetchall()

    results_list = []
    for i in results:
        friend_request = {}
        friend_request['id'] = i[0]
        friend_request['sender'] = i[1]
        results_list.append(friend_request)

    return jsonify({'success': 'ok', 'friend_requests': results_list}), 200


@app.route('/update-friend-request', methods=['POST'])
@cross_origin()
def update_friend_requests():
    if request.method == 'POST':
        req = request.get_json()

        sender = req.get('sender')
        receiver = req.get('receiver')
        friend_request_statement = f"INSERT INTO friend_requests (sender_id, receiver_id) VALUES (\"{sender}\", \"{receiver}\");"

        cursor = db.connection.cursor()
        cursor.execute(friend_request_statement)
        db.connection.commit()

        return jsonify({'friend_request': 'ok'}), 200


@app.route('/validate-friend-request', methods=['POST'])
@cross_origin()
def accept_friend_request():
    req = request.get_json()

    request_id = req.get('request_id')
    accept_or_decline = req.get('accept')
    friend_sender = req.get('sender')
    friend_receiver = req.get('receiver')
    cursor = db.connection.cursor()
    if accept_or_decline == True:
        print("accepted the friend request")
        insert_statement = f"INSERT into friends (friend_id, user1, user2) VALUES (null, \"{friend_sender}\", \"{friend_receiver}\");"
        cursor.execute(insert_statement)
    
    delete_statement = f"DELETE FROM friend_requests WHERE friend_request_id=\"{request_id}\";"
    cursor.execute(delete_statement)

    db.connection.commit()

    return jsonify({'success': 'ok'}), 200


if __name__ == '__main__':
    app.config['DEBUG'] = True #will automatically reload server on any code change (will be useful in debugging)
    #app.run()
    socketio.run(app, port=5000, debug=True)
