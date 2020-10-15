// css
import styles from './InputBar.module.css';

export default function InputBar(props) {
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
      <div className={styles.files}>
        <h3>file</h3>
      </div>
      <div className={styles.message}>
        <input type='text' className={styles.messageBar} id='message' value={props.msg} 
          onChange={e => props.change(e)} onKeyPress={handleKeyPress}
          placeholder='Type your message' autoFocus />
      </div>
      <div className={styles.send} id='send'>
        <button id={styles.sendButton} onClick={handleClick}>Send</button>
      </div>
    </div>
  );
}