// css
import styles from './Conversation.module.css';

// components
import InputBar from './InputBar';
import Bubble from './Bubble';

// socket.io
import io from 'socket.io-client';
import { useRouter } from 'next/router';

// react.js
import { useEffect, useState } from 'react';

// redux
import { connect } from 'react-redux';
import { addMessage } from '../../actions/addMessage';

import {generate_key_nonce, encrypt_message, decrypt_message} from "../../encryption/Encryption";

// react-scroll
import { animateScroll } from 'react-scroll';
import { setMessages } from '../../actions/setMessages';

let endpoint = 'http://localhost:5000';
const socket = io.connect(endpoint);
// let sessionID = 0; 
// var socketConnection = io.connect();
// socket.on('connect', function() {
//   sessionID = socket.socket.sessionid; 
// });
function Conversation(props) {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { user } = router.query;
  //console.log(socket.id);
  socket.emit('loggedIn', user);

  // this will automatically be called when messaage length changes
  useEffect(() => {
    getMessages();
    scrollToBottom();
  }, [props.messages.length, props.selectedConversation]);
  
  // will call when first time app render and
  // every time message length changes
  const getMessages = () => {
    socket.on('private_message', async msg => {
      console.log(props);
      let receivedMessage = {
        'type': 1,
        'text': decrypt_message(msg, props.selectedConversation.key),
      }

      props.addMessage(receivedMessage);
    });
  };

  // changes state of Message as user types into conversation bar
  const onChange = e => {
    setMessage(e.target.value);
  }

  // will need to export wrapper that handles these events
  // const handleSendMessage = (txt) => sendMessage(text);
  const sendMessage = async() => {
    if(message.length < 40 && message !== "") {
      let sentMessage = {
        'type': 0,
        'text': message
      };

      props.addMessage(sentMessage);

      var base_url = 'http://127.0.0.1:5000/'
      
      const message_params = {
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          conversation_id: props.selectedConversation.conversation_id, 
          user: props.user, 
          message: message
        }),
        method: "POST"
      }
      await fetch(base_url+'messages', message_params)
      .then(data => {return data.json()})
      .then(res => {
          console.log('!!!!!')
          console.log(res)
      })

      console.log('key' + props.selectedConversation.key);
      //send message to server
      socket.emit('message', encrypt_message(message, props.selectedConversation.key), props.selectedConversation.user);
      //socket.to(receiverSessionId).emit('message', encrypt_message(message, key));
      
      setMessage("");
      console.log('Message sent!')
    }
    else {
      alert("Please add a message!");
    }
  }

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'conversation'
    })
  }

  return (
    <div className={styles.container}>
      {!props.selectedConversation && 
        <div className={styles.empty}>
          <h1>Press on the "+" icon to start a conversation</h1>
          <h1>or</h1>
          <h1>Select a conversation</h1>
        </div>
      }
      {props.selectedConversation &&
        <div className={styles.selected}>
          <div className={styles.conversation} id='conversation'>
            {props.messages.map(msg => (
              <div>
                <Bubble type={msg['type']} text={msg['text']} />
              </div>
            ))}
          </div>
          <InputBar msg={message} send={() => sendMessage()} change={e => onChange(e)} />
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedConversation: state.conversations.selectedConversation,
  user: state.login.user,
  messages: state.messages.messages,
});

const dispatchStateToProps = (dispatch) => ({
  addMessage: (message) => dispatch(addMessage(message)),
});

export default connect(mapStateToProps, dispatchStateToProps)(Conversation);