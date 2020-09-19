import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <Link href='/'>HOME</Link>
    </div>
  );
}