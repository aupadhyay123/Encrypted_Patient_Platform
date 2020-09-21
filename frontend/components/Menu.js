// css
import styles from './Menu.module.css';

// component imports
import MenuItem from './MenuItem';

const ItemArr = [
  'profile',
  'messages',
  'search',
  'settings'
]

export default function Menu(props) {
  const Items = () => ItemArr.map(item => {
    return (
      <MenuItem link={'/' + item} label={item} />
    );
  });

  return (
    <div className={styles.menu}>
      <Items />
    </div>
  );
}