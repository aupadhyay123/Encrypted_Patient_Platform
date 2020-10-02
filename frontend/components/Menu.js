// css
import styles from './Menu.module.css';

// component imports
import MenuItem from './MenuItem';

export default function Menu(props) {
  return (
    <div className={styles.menu}>
      <a href={'../'}>Profile</a>
      <a href={'../'}>Messages</a>
      <a href={'../'}>Search</a>
      <a href={'../'}>Settings</a>
    </div>
  );
}