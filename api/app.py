from flask import Flask, request, jsonify, make_response, render_template, redirect, url_for
#from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import SocketIO
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from cryptography.fernet import Fernet

# ...app config...
app = Flask(__name__)
#socketio = SocketIO(app, cors_allowed_origins="*")

#TODO move these variables to a constants.py file for easy change
# POSTGRES = {
#     'user': 'admin',
#     'pw': 'admincsci401',
#     'db': 'Vaunect_DB',
#     'host': 'localhost',
#     'port': '5432',
# }

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Qaz1234mko'
app.config['MYSQL_DB'] = 'Vaunect'

#provides flask with the uri to connect to the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Qaz1234mko@localhost/Vaunect'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


#db = SQLAlchemy(app) #creates an sql alchemy object to communicate with postgres db (db name: Vaunect)

#db.init_app(app) #ensures connection to database is secure, thus no information may be leaked

db = MySQL(app)

@app.route('/')
def hello_world():
    key = Fernet.generate_key()
    file = open('secret_key.key', 'wb')
    file.write(key)
    file.close()
    print(key)
    return render_template('login.html')


if __name__ == '__main__':
    app.config['DEBUG'] = True #will automatically reload server on any code change (will be useful in debugging)
    app.run()
    socketio.run(app, host='0.0.0.0')
