from flask import Flask, request, jsonify, make_response, render_template, redirect, url_for
from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import SocketIO, send
from .config import Config
#from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_cors import CORS,cross_origin
import shortuuid
# ...app config...
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = "Qaz1234mko"
app.config['MYSQL_DB'] = "Vaunect"
app.config['MYSQL_HOST'] = 'localhost'
app.config['CORS_HEADERS'] = "Content-Type"

db = MySQL(app)


@socketio.on('message')
def message_received(msg):
    print(msg)
    send(msg, broadcast=True, include_self=False)
    return None

@app.route("/register", methods=["POST"])
@cross_origin()
def register():
    print("attemptint to register user")
    req = request.get_json()

    user_id = shortuuid.ShortUUID().random(length=40)
    user_id = shortuuid.ShortUUID().random(length=40)
    private_key = '1234522242'
    public_key = '1232414141'
    username = req.get('username')
    first_name = req.get('first_name')
    last_name =  req.get('last_name')
    email =  req.get('email')
    phone = req.get('phone')
    password =  req.get('password')

    register_statement = """INSERT INTO users (user_id, username, first_name, last_name, email, phone, 
                            password, private_key, public_key) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);"""
    values = (user_id, username, first_name, last_name, email, phone, password, private_key, public_key)

    cursor = db.connection.cursor()
    cursor.execute(register_statement, values)
    db.connection.commit()

    return jsonify("registration:success"), 200


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    print("attempting user login")
    req = request.get_json()

    username = req.get('username')
    password = req.get('password')

    login_statement = "SELECT user_id FROM users WHERE username=%s AND password=%s;"
    values = (username, password)

    cursor = db.connection.cursor()
    cursor.execute(login_statement, values)

    return jsonify("login:success"), 200


@app.route("/search", methods=["POST"])
@cross_origin()
def search():
    print("Attempting to search for user")
    req = request.get_json()

    query = req.get('query')
    user = req.get('user')

    search_statement = f"""SELECT username, first_name, last_name FROM users 
                            WHERE (username LIKE \"%{query}%\" 
                            OR CONCAT_WS(\" \", first_name, last_name) LIKE \"%{query}%\")
                            AND username != \"{user}\";"""

    cursor = db.connection.cursor()
    cursor.execute(search_statement)
    results = cursor.fetchall()
    print(results)

    results_list = []
    for i in results:
        user = {}
        user['username'] = i[0]
        user['first_name'] = i[1]
        user['last_name'] = i[2]
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


@app.route('/friend-request', methods=['POST', 'DELETE'])
@cross_origin()
def friend_request():
    if request.method == 'POST':
        req = request.get_json()

        sender = req.get('sender')
        receiver = req.get('receiver')
        friend_request_statement = f"INSERT INTO friend_requests (sender_id, receiver_id) VALUES (\"{sender}\", \"{receiver}\");"

        cursor = db.connection.cursor()
        cursor.execute(friend_request_statement)
        db.connection.commit()

        return jsonify({'friend_request': 'ok'}), 200
    elif request.method == 'DELETE':
        pass


if __name__ == '__main__':
    app.config['DEBUG'] = True #will automatically reload server on any code change (will be useful in debugging)
    app.run()
    socketio.run(app, port=5000, debug=True)
