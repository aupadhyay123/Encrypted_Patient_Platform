import styles from './FormInput.module.css';

export default function FormInput(props) {
  return (
    <div className={styles.inputContainer}>
      <h3 className={styles.inputHeader}>{props.title}</h3>
      <input type={props.type} className={styles.inputField} id={props.title}></input>
    </div>
  );
}