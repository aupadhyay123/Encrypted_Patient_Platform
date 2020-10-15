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
    print('hello')
    req = request.get_json()
    print(req)
    #res = make_response(jsonify({"message": "ok"}), 400)
    user_id = shortuuid.ShortUUID().random(length=40)
    print(user_id)
    user_id = shortuuid.ShortUUID().random(length=40)
    private_key = '1234522242'
    public_key = '1232414141'
    username = req.get('username')
    first_name = req.get('first_name')
    last_name =  req.get('last_name')
    email =  req.get('email')
    phone = req.get('phone')
    password =  req.get('password')


    register_statement = "INSERT INTO users (user_id, private_key, public_key, username, password, phone_number, email, first_name, last_name) VALUES (%s, %s, %s,%s, %s, %s,%s, %s, %s)"
    print("youuu")
    cursor = db.connection.cursor()
    cursor.execute(register_statement, str(user_id), str(private_key), str(public_key), str(username), str(first_name), str(last_name), str(email), str(phone), str(password))
    print("im here")
    db.connection.commit()
    return jsonify("registration:ok"), 200


if __name__ == '__main__':
    app.config['DEBUG'] = True #will automatically reload server on any code change (will be useful in debugging)
    app.run()
    socketio.run(app, port=5000, debug=True)
