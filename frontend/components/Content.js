// css
import styles from './Content.module.css';

// components
import Profile from './Profile';
import Messages from './Messages';

export default function Content(props) {
  return (
    <div className={styles.content}>
      {props.section === 'messages' &&
        <Messages />
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