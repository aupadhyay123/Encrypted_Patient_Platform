// css
import styles from './Conversation.module.css';

// components
import InputBar from './InputBar';
import Bubble from './Bubble';

// socket.io
import io from 'socket.io-client';

// react.js
import { useEffect, useState, useRef } from 'react';

// next.js
import { useRouter } from 'next/router';

import {generate_key_nonce, encrypt_message, decrypt_message} from "../../encryption/Encryption";

// react-scroll
import { animateScroll } from 'react-scroll';

let endpoint = 'http://localhost:5000';
let socket = io.connect(endpoint);

export default function Conversation(props) {
  const router = useRouter();
  const { user } = router.query;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  // this will automatically be called when messaage length changes
  useEffect(() => {
    getMessages();
    scrollToBottom();
  }, [messages.length]);
  
  // will call when first time app render and
  // every time message length changes
  const getMessages = () => {
    socket.on('message', async msg => {
      var key;
      //var nonce;
      var base_url = 'http://127.0.0.1:5000/'
      const params = {
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({user1: "arif1", user2: "arif2"}),
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
                  .then(data => {return data.json()})
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
    if(message !== "") {
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
        body: JSON.stringify({user1: "arif1", user2: "arif2"}),
        method: "POST"
      }
      console.log('kakakaka')
      var key;
      //var nonce;
      await fetch(base_url+'conversation/exists', params)
          .then(data => {return data.json()})
          .then(async res => {
            if(res.results == 'False'){
              var key_nonce = generate_key_nonce()
              key = key_nonce['key']
              //nonce = key_nonce['nonce']
              const create_params = {
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify({user1: "arif1", user2: "arif2", secret_key: key}),
                method: "POST"
              }
              fetch(base_url+'conversation', create_params)
            }
            else{
              await fetch(base_url+'conversation/retrieve', params)
                  .then(data => {return data.json()})
                  .then(res => {
                    var box = res.results
                    //nonce = Uint8Array.from(box['nonce'])
                    key = Uint8Array.from(box['secret_key'])
                  })
            }
          })
      console.log(encrypt_message(message, key))
      console.log(decrypt_message(encrypt_message(message, key), key))

      socket.emit('message', encrypt_message(message, key));
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
      {/* {!props.selected && 
        <div className={styles.empty}>
          <h1>Please select a conversation</h1>
        </div>
      } */}
      {!props.selected &&
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