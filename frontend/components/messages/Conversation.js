// css
import styles from './Conversation.module.css';

export default function Conversation(props) {
  return (
    <div className={styles.container}>
      {!props.selected && 
        <div className={styles.empty}>
          <h1>Please select a conversation</h1>
        </div>
      }
      {props.selected &&
        <div className={styles.selected}>
          
        </div>
      }
    </div>
  );
}