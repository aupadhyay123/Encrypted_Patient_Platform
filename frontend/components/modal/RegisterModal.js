// components
import Modal from './Modal';
import FormInput from './FormInput';

// css
import styles from './Modal.module.css';

// next.js
import Link from 'next/link';
import {useRouter} from 'next/router';

import {generate_key_pair} from '../../encryption/Encryption.js';

// react.js
import { useState } from 'react';

export default function RegisterModal(props) {
  const router = useRouter();

  // state
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    if(!username.length) {
      setUsernameError('Please put your username');
      return false;
    }
    if(!firstName.length) {
      setNameError('Please put your first name');
      return false;
    }
    if(!lastName.length) {
      setNameError('Please put your last name');
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

    console.log("validated fields");
    return true;
  }

  const handleSubmit = e => {
    console.log("handle submit");
    e.preventDefault();
    const isValid = validate();
    if(isValid) {
      console.log(name);
      console.log(email);
      console.log(phone);
      console.log(password);

      var key_array = generate_key_pair();
      console.log(key_array);
      const url = 'http://localhost:5000/register';
      fetch(url, {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          phone: phone,
          first_name: firstName,
          last_name: lastName,
          public_key: key_array['public_key'],
          private_key: key_array['private_key']
        })
      })
      .then(res => {
          console.log(res);
          if(res.status === 200) {
            alert("Successfully registered user");
            router.push('/dashboard/' + username);
          }
          else {
            console.log("Looks like there was a problem. Status code: " + res.status);
            return;
          }
      })
      .catch(error => {
        console.log("Fetch error: " + error);
      })
    }
    else {
      console.log("Invalid fields");
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
            title='Username' 
            type='text' 
            onChange={(e) => setUsername(e.target.value)}
            value={username} />
          <FormInput 
            title='First Name' 
            type='text' 
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName} />
          <FormInput 
            title='Last Name' 
            type='text' 
            onChange={(e) => setLastName(e.target.value)}
            value={lastName} />
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