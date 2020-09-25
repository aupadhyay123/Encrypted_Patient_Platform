// components
import Modal from './Modal';
import FormInput from './FormInput';

// css
import styles from './Modal.module.css';

// next.js
import Link from 'next/link';

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
    let nameError = '';
    let emailError = '';
    let phoneError = '';
    let passwordError = '';

    if(name.length === 0) {
      return false
    }
    if(!email.includes('@')) {
      return false;
    }
    if(phone.length === 0) {
      return false;
    }
    if(password.length === 0) {
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
            title='Phone Number' 
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