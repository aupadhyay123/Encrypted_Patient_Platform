// css
import styles from './Menu.module.css';

// component imports
import MenuItem from './MenuItem';

export default function Menu(props) {
  const Items = () => props.items.map(item => {
    return (
      <MenuItem label={item} />
    );
  });

  return (
    <div className={styles.menu}>
      {/* <Items /> */}
    </div>
  );
}