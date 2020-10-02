// componenets
import Modal from './Modal';
import FormInput from './FormInput';

// css
import styles from './Modal.module.css';

// next.js
import Link from 'next/link';

// react.js
import { useState } from 'react';

export default function LoginModal(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const url = 'http://cd40ad7bea40.ngrok.io/login';
    fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(data => {
      return data.json()
    })
    .then(res => {
        console.log(res);
        if(res.status === 200) {
          const router = useRouter();
          router.push('/dashboard/messages');
        }
    })
  }

  return (
    <Modal>
      <div className={styles.input}>
        <div className={styles.modalHeader}>
          <h1>SIGN IN</h1>
          <p>Don't have an account? <Link href='/register' className='link'>Sign Up</Link></p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormInput 
            title='Email' 
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email} />
          <FormInput 
            title='Password' 
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password} />
          <input type='submit' value='SIGN IN' className={styles.submitButton} id={styles.loginButton} />
        </form>
      </div>
      <div id={styles.loginImage} className={styles.imageContainer} />
    </Modal>
  );
}