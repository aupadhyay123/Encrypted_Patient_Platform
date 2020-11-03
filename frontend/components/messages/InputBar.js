// css
import styles from './InputBar.module.css';

// react
import { useEffect, useRef } from 'react';

// autosize
import autosize from 'autosize';

export default function InputBar(props) {
  const textInput = useRef(null);

  useEffect(() => {
    autosize(textInput);
  }, [])

  const handleClick = () => {
    props.send();
  }

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.files}>
        <h3>file</h3>
      </div> */}
      <div className={styles.message}>
        <input type='textarea' className={styles.messageBar} value={props.msg} 
          onChange={e => props.change(e)} onKeyPress={handleKeyPress}
          placeholder='Type your message' ref={textInput} autoFocus />
      </div>
      <div className={styles.send} id='send'>
        <button id={styles.sendButton} onClick={handleClick}>Send</button>
      </div>
    </div>
  );
}