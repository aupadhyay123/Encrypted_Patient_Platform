// css
import styles from './Bubble.module.css';

export default function Bubble(props) {
  let bubble;
  if(props.type === 0) {
    bubble = (
      <div className={styles.sent}>
        {props.text}
      </div>
    );
  }
  else {
    bubble = (
      <div className={styles.received}>
        {props.text}
      </div>
    )
  }

  return (
    bubble
  );
}