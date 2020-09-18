from flask import Flask, request, jsonify, make_response, render_template, redirect, url_for
from fusionauth.fusionauth_client import FusionAuthClient
from flask_socketio import SocketIO
from config import Config
from app import app, socketio

global app
global socketio

@socketio.on('sendMsg')
def sendMsg(req):
    message = req['message']
    user_name = req['user_name']
    recipient = req['recipient']
    data = {'message': message, 'user_name': user_name, 'recipient': recipient}
    socketio.emit('response', data)

    #TODO: STORE IN DATABASE


@app.route('/conversation/<user_name>')
def conversation(user_name):
    return render_template('conversation.html', user_name=user_name)

