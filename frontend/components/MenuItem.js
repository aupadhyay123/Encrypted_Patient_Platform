// css
import styles from './MenuItem.module.css';

// next imports
import Link from 'next/link';

export default function MenuItem(props) {
  return (
    <div className={styles.item}>
      <Link href={'/' + props.label}>
        <img></img>
        <a>{props.label}</a>
      </Link>
    </div>
  );
}