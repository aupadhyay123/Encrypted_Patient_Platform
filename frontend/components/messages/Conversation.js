// css
import styles from './Conversation.module.css';

// components
import InputBar from './InputBar';

// socket.io
import io from 'socket.io-client';

// react.js
import { useEffect } from 'react';

export default function Conversation(props) {
  var socket;

  useEffect(() => {
    socket = io.connect('http://localhost:5000');
    // socket.on('connect', () => console.log('connected socket'));

    // Message received from server
    socket.on('message_from_server', (data) => {
      console.log('server received message!');
      var msg = data['text'];
      document.getElementById('conversation').innerHTML += "Server: " + msg + "\n\n";
    })
  });  

  // will need to export wrapper that handles these events
  // const handleSendMessage = (txt) => sendMessage(text);

  const sendMessage = (msg) => {
    // update chat window
    document.getElementById('conversation').innerHTML += "You: " + msg + "\n\n";

    // emit a message to the 'send_message' socket
    socket.emit('send_message',
    {
      'text': msg
    });
    
    // set the text input to empty
    document.getElementById('message').value = '';
  }

  return (
    <div className={styles.container}>
      {/* {!props.selected && 
        <div className={styles.empty}>
          <h1>Please select a conversation</h1>
        </div>
      } */}
      {!props.selected &&
        <div className={styles.selected}>
          <div className={styles.conversation} id='conversation' />
          <InputBar send={(msg) => sendMessage(msg)} />
        </div>
      }
    </div>
  );
}