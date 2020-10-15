// css
import styles from './Content.module.css';

// components
import Profile from '../profile/Profile';
import Messages from '../messages/Messages';
import Settings from '../settings/Settings';
import Search from '../search/Search';

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