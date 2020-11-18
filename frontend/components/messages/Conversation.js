// css
import styles from './Conversation.module.css';

// components
import InputBar from './InputBar';
import Bubble from './Bubble';

// socket.io
import io from 'socket.io-client';
import { useRouter } from 'next/router';

// react.js
import { useEffect, useState, useRef } from 'react';

// redux
import { connect } from 'react-redux';

import {generate_key_nonce, encrypt_message, decrypt_message} from "../../encryption/Encryption";

// react-scroll
import { animateScroll } from 'react-scroll';

let endpoint = 'http://localhost:5000';
const socket = io.connect(endpoint);
// let sessionID = 0; 
// var socketConnection = io.connect();
// socket.on('connect', function() {
//   sessionID = socket.socket.sessionid; 
// });
function Conversation(props) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { user } = router.query;
  //console.log(socket.id);
  socket.emit('loggedIn', user);

  const messagesEndRef = useRef(null);

  // this will automatically be called when messaage length changes
  useEffect(() => {
    getMessages();
    scrollToBottom();
  }, [messages.length, props.selectedConversation]);
  
  // will call when first time app render and
  // every time message length changes
  const getMessages = () => {
    socket.on('private_message', async msg => {
      console.log("im in here");
      var key;
      //var nonce;
      var base_url = 'http://127.0.0.1:5000/'
      const params = {
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({user1: props.user, user2: props.selectedConversation}),
        method: "POST"
      }
      await fetch(base_url+'conversation/exists', params)
          .then(data => {return data.json()})
          .then(async res => {
            if(res.results == 'False'){
              throw new Error('Conversation does not exist')
            }
            else{
              await fetch(base_url+'conversation/retrieve', params)
                  .then(data => {
                    console.log(data.json());
                    return data.json();
                  })
                  .then(res => {
                    var box = res.results
                    //nonce = Uint8Array.from(box['nonce'])
                    key = Uint8Array.from(box['secret_key'])
                  })
            }
          })

      let receivedMessage = {
        'type': 1,
        'text': decrypt_message(msg, key)
      }
      setMessages([...messages, receivedMessage]);
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

      setMessages([...messages, sentMessage]);
      var base_url = 'http://127.0.0.1:5000/'
      const params = {
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({user1: props.user, user2: props.selectedConversation}),
        method: "POST"
      }
      var key;
      var conversation_id;
      await fetch(base_url+'conversation/exists', params)
          .then(data => {return data.json()})
          .then(async res => {
            if(res.results == 'False'){
              var key_nonce = generate_key_nonce()
              key = key_nonce['key']
              const create_params = {
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify({user1: props.user, user2: props.selectedConversation, secret_key: key}),
                method: "POST"
              }
              await fetch(base_url+'conversation', create_params)
                  .then(data => {return data.json()})
                  .then(res => {
                    var box = res.results
                    console.log(box)
                    conversation_id = box['conversation_id']
                  })
            }
            else{
              await fetch(base_url+'conversation/retrieve', params)
                  .then(data => {return data.json()})
                  .then(res => {
                    var box = res.results
                    //nonce = Uint8Array.from(box['nonce'])
                    key = Uint8Array.from(box['secret_key'])
                    conversation_id = box['conversation_id']
                  })
            }
            const message_params = {
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({conversation_id: conversation_id, user: props.user, message: message}),
              method: "POST"
            }
            await fetch(base_url+'messages', message_params)
                .then(data => {return data.json()})
                .then(res => {
                    console.log('!!!!!')
                    console.log(res)
                })
          })
      //send message to server
      socket.emit('message', encrypt_message(message, key), props.selectedConversation);
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
            {messages.map(msg => (
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
  message: state.messages.messages,
});

export default connect(mapStateToProps)(Conversation);