// css
import styles from './Menu.module.css';

// component imports
import MenuItem from './MenuItem';

export default function Menu(props) {
  return (
    <div className={styles.container}>
      <MenuItem icon='/images/icons/profile.png' size='30px' selectSection={() => props.updateSection('profile')} />
      <MenuItem icon='/images/icons/messages.png' size='30px' selectSection={() => props.updateSection('messages')} />
      <MenuItem icon='/images/icons/search.png' size='30px' selectSection={() => props.updateSection('search')} />
      <MenuItem icon='/images/icons/settings.png' size='30px' selectSection={() => props.updateSection('settings')} />
    </div>
  );
}