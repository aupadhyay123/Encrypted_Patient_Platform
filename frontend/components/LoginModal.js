// componenets
import Modal from './Modal';
import FormInput from './FormInput';

// css
import styles from './Modal.module.css';

// next.js
import Link from 'next/link';

export default function LoginModal(props) {
  return (
    <Modal>
      <div className={styles.input}>
        <div className={styles.modalHeader}>
          <h1>SIGN IN</h1>
          <p>Don't have an account? <Link href='/register' className='link'>Sign Up</Link></p>
        </div>
        <form className={styles.form}>
          <FormInput title='Email' type='text' />
          <FormInput title='Password' type='password' />
          <input type='submit' value='SIGN UP' className={styles.submitButton} id={styles.loginButton} />
        </form>
      </div>
      <div id={styles.loginImage} className={styles.imageContainer} />
    </Modal>
  );
}