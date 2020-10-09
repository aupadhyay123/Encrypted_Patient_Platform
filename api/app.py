from flask import Flask, request, jsonify, make_response, render_template, redirect, url_for
from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import *
from .config import Config
from flask_sqlalchemy import SQLAlchemy
import mysql.connector

# ...app config...
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)

# #TODO move these variables to a constants.py file for easy change
# POSTGRES = {
#     'user': 'admin',
#     'pw': 'admincsci401',
#     'db': 'Vaunect_DB',
#     'host': 'localhost',
#     'port': '5432',
# }
# #provides flask with the uri to connect to the database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
# %(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# db = SQLAlchemy(app) #creates an sql alchemy object to communicate with postgres db (db name: Vaunect_DB)

# db.init_app(app) #ensures connection to database is secure, thus no information may be leaked

config = {
    "host": "localhost",
    "user": "root",
    "password": "Qaz1234mko",
    "database": "Vaunect",
    "port": "3306"
}

@app.route("/registration", methods=["POST"])
def sign_up():
    conn = mysql.connector.connect(**config)

    data = request.json
    new_user = {
        "username": data.get('username'),
        "first_name": data.get('first_name'),
        "last_name": data.get('last_name'),
        "email": data.get('email'),
        "phone": data.get('phone'),
        "password": data.get('password')
    }

    register = ("INSERT INTO users"
                "(username, first_name, last_name, email, phone, password)"
                "VALUES (%s, %s, %s, %s, %s, %s)")

    cursor = conn.cursor()
    cursor.execute(register, new_user)

    conn.commit()

    cursor.close()
    conn.close()

@socketio.on('send_message')
def message_received(data):
    print(data['text'])
    emit('message_from_server',
    {
        'text': 'Message received!'
    })


if __name__ == '__main__':
    app.config['DEBUG'] = True #will automatically reload server on any code change (will be useful in debugging)
    app.run()
    socketio.run(app, port=5000, debug=True)
