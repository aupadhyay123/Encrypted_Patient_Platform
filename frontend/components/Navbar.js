import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <Link href='/'>HOME</Link>
      <Link style={{border: "1px solid black", backgroundColor: "#ad03df"}} href='/register'>Sign Up</Link>
    </div>
  );
}