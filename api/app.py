from flask import Flask, request, jsonify, make_response, render_template, redirect, url_for
from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import SocketIO, send
from .config import Config
#from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_cors import CORS,cross_origin
import shortuuid
from cryptography.fernet import Fernet
# ...app config...
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Qaz1234mko'
app.config['MYSQL_DB'] = 'Vaunect'
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['CORS_HEADERS'] = "Content-Type"

db = MySQL(app)

f = open("secret_key.key", "r")
key = f.readline()
encrypt_key = Fernet(key)


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
    private_key = req.get('private_key')
    public_key = req.get('public_key')
    username = req.get('username')
    first_name = req.get('first_name')
    last_name =  req.get('last_name')
    email =  req.get('email')
    phone = req.get('phone')
    password =  req.get('password')
    cursor = db.connection.cursor()
    check_if_unique_user = '''SELECT * FROM users where username = %s or email = %s'''
    values = (username, email)
    cursor.execute(check_if_unique_user, values)
    results = cursor.fetchall()

    if len(results) == 0:
        byte_version = bytes(first_name, 'utf-8')
        first_name = encrypt_key.encrypt(byte_version)

        byte_version= bytes(last_name, 'utf-8')
        last_name = encrypt_key.encrypt(byte_version)

        byte_version=bytes(email, 'utf-8')
        email = encrypt_key.encrypt(byte_version)

        byte_version=bytes(password, 'utf-8')
        password = encrypt_key.encrypt(byte_version)

        byte_version=bytes(phone, 'utf-8')
        phone = encrypt_key.encrypt(byte_version)

        register_statement = """INSERT INTO users (user_id, username, first_name, last_name, email, phone, 
                                password, private_key, public_key) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);"""
        values = (user_id, username, first_name, last_name, email, phone, password, private_key, public_key)
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
            return jsonify(user_id=results[0][0],login=True), 200
        else:
            return jsonify(login=False),400
    return jsonify(login=False), 400


if __name__ == '__main__':
    app.config['DEBUG'] = True #will automatically reload server on any code change (will be useful in debugging)
    app.run()
    socketio.run(app, port=5000, debug=True)
