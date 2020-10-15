from flask import Flask, request, jsonify, make_response, render_template, redirect, url_for
from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import SocketIO, send
from .config import Config
#from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
import shortuuid

# ...app config...
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Qaz1234mko'
app.config['MYSQL_DB'] = 'Vaunect'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Qaz1234mko@localhost/Vaunect'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = MySQL(app)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        print('hello')
        req = request.get_json()
        print(req)

        res = make_response(jsonify({"message": "ok"}), 400)
        return res
    # user_id = shortuuid.ShortUUID().random(length=40)
    # username = req[]

    # new_user = {
    #     "user_id": shortuuid.ShortUUID().random(length=40),
    #     "username": data.get('username'),
    #     "first_name": data.get('first_name'),
    #     "last_name": data.get('last_name'),
    #     "email": data.get('email'),
    #     "phone": data.get('phone'),
    #     "password": data.get('password')
    # }

    # register = (f"INSERT INTO users"
    #             + "(user_id, username, first_name, last_name, email, phone, password)"
    #             + "VALUES ({user_id}, {username}, {first_name}, {last_name}, {email}, {phone}, {password})")

    # cursor = db.connection.cursor()
    # cursor.execute(register, new_user)
    
    # results = cursor.fetchall()
    # if results:
    #     return jsonify(new_user), 200
    # else:
    #     return jsonify(new_user), 400

@socketio.on('message')
def message_received(msg):
    print(msg)
    send(msg, broadcast=True, include_self=False)
    return None

if __name__ == '__main__':
    app.config['DEBUG'] = True #will automatically reload server on any code change (will be useful in debugging)
    app.run(debug=True)
    socketio.run(app, port=5000, debug=True)
