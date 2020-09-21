import Link from "next/link";
import FormInput from "./FormInput";
import styles from './Modal.module.css';

export default function Modal(props) {


  if(props.page === 'register') {
    return (
      <div className={styles.container}>
        <div className={styles.input}>
          <div className={styles.modalHeader}>
            <h1>SIGN UP</h1>
            <p>Already have an account? <Link href='/login' className='link'>Sign In</Link></p>
          </div>
          <form className={styles.form} method='POST'>
            <FormInput title='Name' type='text' />
            <FormInput title='Email' type='text' />
            <FormInput title='Phone Number' type='text' />
            <FormInput title='Password' type='password' />
            <input type='submit' value='SIGN UP' className={styles.submitButton} id={styles.registerButton} />
          </form>
        </div>
        <div id={styles.registerImage} className={styles.imageContainer} />
      </div>
    );
  }
  else if(props.page === 'login') {
    return (
      <div className={styles.container}>
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
      </div>
    );
  }
  else if(props.page === 'index') {
    return (
      <div className={styles.container}>
        <div id={styles.logoImage} />
        <div className={styles.content}>
          <h1>HELLO</h1>
        </div>
      </div>
    );
  }
}