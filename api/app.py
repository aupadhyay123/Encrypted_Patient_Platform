from flask import Flask, request, jsonify, make_response, render_template, redirect, url_for
from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import SocketIO
from config import Config
from flask_sqlalchemy import SQLAlchemy

# ...app config...
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

#TODO move these variables to a constants.py file for easy change
POSTGRES = {
    'user': 'admin',
    'pw': 'admincsci401',
    'db': 'Vaunect_DB',
    'host': 'localhost',
    'port': '5432',
}
#provides flask with the uri to connect to the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app) #creates an sql alchemy object to communicate with postgres db (db name: Vaunect_DB)

db.init_app(app) #ensures connection to database is secure, thus no information may be leaked

@app.route('/')
def hello_world():
    return render_template('login.html')


if __name__ == '__main__':
    app.config['DEBUG'] = True #will automatically reload server on any code change (will be useful in debugging)
    app.run()
    socketio.run(app, host='0.0.0.0')
