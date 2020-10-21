// componenets
import Modal from './Modal';
import FormInput from './FormInput';

// css
import styles from './Modal.module.css';

// next.js
import Link from 'next/link';
import {useRouter} from 'next/router';

// react.js
import { useState } from 'react';

// redux
import { connect } from 'react-redux';
import { login } from '../../actions/login';

function LoginModal(props) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const url = 'http://localhost:5000/login';
    fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then(res => {
      console.log(res);
<<<<<<< HEAD
      if(res.status === 200) {
        props.loginUser(username);
        router.push('/dashboard/' + username);
        // return res.json()
=======
      if(res.status === 200){
        console.log('going to dashboard');
        router.push('/dashboard/' + username);
        return res.json();
>>>>>>> updates
      }
      else {
        console.log("Looks like there was a problem. Status code: " + res.status);
        return;
      }
    })
    .then(data => {
<<<<<<< HEAD

=======
        sessionStorage.setItem('0_key', data['key0']);
        sessionStorage.setItem('1_key', data['key1']);
>>>>>>> updates
    })
    .catch(error => {
      console.log("Fetch error: " + error);
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
            title='Username' 
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username} />
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

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(login(user))
})

export default connect(null, mapDispatchToProps)(LoginModal);