// css
import styles from './Content.module.css';

// import
import Profile from './Profile';
import Settings from './Settings';
import Search from './Search';

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
        <Settings />
      }
      {props.section === 'search' &&
        <Search />
      }
    </div>
  )
}