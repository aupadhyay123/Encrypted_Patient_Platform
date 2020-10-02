// css
import styles from './AddButton.module.css';

export default function AddButton(props) {
  const createConversation = () => {
    // TODO
  }

  const ButtonStyle = {
    width: props.size,
    height: props.size
  }

  return (
    <div className={styles.button} onClick={() => createConversation}>
      <img src={'/images/icons/plus.png'} style={ButtonStyle} />
    </div>
  );
}