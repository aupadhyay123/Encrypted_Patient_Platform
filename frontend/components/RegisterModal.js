// components
import Modal from './Modal';
import FormInput from './FormInput';

// css
import styles from './Modal.module.css';

// next.js
import Link from 'next/link';
import useRouter from 'next/router';

// react.js
import { useState } from 'react';

export default function RegisterModal(props) {
  // state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    if(!name.length) {
      setNameError('Please put your name');
      return false;
    }
    if(!email.includes('@')) {
      setEmailError('Please input a valid email');
      return false;
    }
    if(!phone.length) {
      setPhoneError('Please input a phone number');
      return false;
    }
    if(password.length < 8) {
      setPhoneError('Please input a password at least 8 characters');
      return false;
    }

    return true;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const isValid = validate();
    if(isValid) {
      console.log(name);
      console.log(email);
      console.log(phone);
      console.log(password);

      const url = 'http://cd40ad7bea40.ngrok.io/registration';
      fetch(url, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          phone: phone,
          name: name
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
  }

  return (
    <Modal>
      <div className={styles.input}>
        <div className={styles.modalHeader}>
          <h1>SIGN UP</h1>
          <p>Already have an account? <Link href='/login' className='link'>Sign In</Link></p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormInput 
            title='Name' 
            type='text' 
            onChange={(e) => setName(e.target.value)}
            value={name} />
          <FormInput 
            title='Email' 
            type='text' 
            onChange={(e) => setEmail(e.target.value)}
            value={email} />
          <FormInput 
            title='Phone' 
            type='text' 
            onChange={(e) => setPhone(e.target.value)}
            value={phone} />
          <FormInput 
          title='Password' 
          type='password' 
          onChange={(e) => setPassword(e.target.value)}
          value={password} />
          <input type='submit' value='SIGN UP' className={styles.submitButton} id={styles.registerButton} />
        </form>
      </div>
      <div id={styles.registerImage} className={styles.imageContainer} />
    </Modal>
  );
}