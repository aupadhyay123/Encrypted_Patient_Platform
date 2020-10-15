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
    socket.on('message', msg => {
      let receivedMessage = {
        'type': 1,
        'text': msg
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
  const sendMessage = () => {
    if(message !== "") {
      let sentMessage = {
        'type': 0,
        'text': message
      };
      setMessages([...messages, sentMessage]);
      socket.emit('message', message);
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