// css
import styles from './Content.module.css';

export default function Content(props) {
  return (
    <div className={styles.content}>
      {props.section === 'messages' &&
        <h1>messages</h1>
      }
      {props.section === 'profile' &&
        <Profile />
      }
      {props.section === 'settings' &&
        <h1>settings</h1>
      }
      {props.section === 'search' &&
        <h1>search</h1>
      }
    </div>
  )
}