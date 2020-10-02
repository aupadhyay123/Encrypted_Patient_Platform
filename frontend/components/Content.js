// css
import styles from './Content.module.css';

// components
import Profile from './Profile';
import Messages from './Messages';
import Settings from './Settings';
import Search from './Search';

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
        <Settings />
      }
      {props.section === 'search' &&
        <Search />
      }
    </div>
  )
}