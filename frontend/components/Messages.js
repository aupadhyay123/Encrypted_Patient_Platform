// next.js
import { useRouter } from "next/router";

// react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// css
import styles from './Messages.module.css';

export default function Messages() {
  const router = useRouter();
  const { user } = router.query;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div>
          
        </div>
      </div>
      <div className={styles.message}>
        <h1>add backend to show conversation</h1>
      </div>
    </div>
  );
}