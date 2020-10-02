// css
import styles from './Menu.module.css';

// component imports
import MenuItem from './MenuItem';

export default function Menu(props) {
  return (
    <div className={styles.menu}>
      <a onClick={() => props.updateSection('profile')}>Profile</a>
      <a onClick={() => props.updateSection('messages')}>Messages</a>
      <a onClick={() => props.updateSection('search')}>Search</a>
      <a onClick={() => props.updateSection('settings')}>Settings</a>
    </div>
  );
}