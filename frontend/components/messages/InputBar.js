// css
import styles from './InputBar.module.css';

export default function InputBar(props) {
  const handleClick = () => {
    var msg = document.getElementById('message').value;
    props.send(msg);
    console.log(msg);
  }

  return (
    <div className={styles.container}>
      <div className={styles.files}>
        <h3>file</h3>
      </div>
      <div className={styles.message}>
        <input type='text' className={styles.messageBar} id='message' />
      </div>
      <div className={styles.send} id='send'>
        <button id='send' onClick={handleClick}>Send</button>
      </div>
    </div>
  );
}