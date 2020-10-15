// css
import styles from './Navbar.module.css';

// next.js
import Link from 'next/link';

export default function Navbar(props) {
  return (
    <div className={styles.container}>
      <Link href='/'>
        <a>
          <img src={'/images/icons/home.png'} className={styles.homeIcon} />
        </a>
      </Link>
      <Link style={{border: "1px solid black", backgroundColor: "#ad03df"}} href='/register'>
        <a className={styles.signUp}>Sign Up</a>
      </Link>
    </div>
  );
}