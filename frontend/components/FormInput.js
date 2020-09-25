import styles from './FormInput.module.css';

const placeholders = {
  'Name': 'Bob Smith',
  'Phone': '123-456-7890',
  'Email': 'bob@gmail.com',
  'Password': 'At least 8 characters'
}

export default function FormInput(props) {
  return (
    <div className={styles.inputContainer}>
      <h3 className={styles.inputHeader}>{props.title}</h3>
      <input 
        type={props.type} 
        className={styles.inputField} 
        id={props.title} 
        onChange={props.onChange}
        placeholder={placeholders[props.title]} />
    </div>
  );
}