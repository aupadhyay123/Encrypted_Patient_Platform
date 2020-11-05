// css
import styles from './Settings.module.css';

export default function Settings(props) {
  return (
    <div className={styles.container}>
      <button style={{position: 'fixed', width: '80%', left: '10%', top:'40%' ,fontSize: '40px', textAlign: 'center', backgroundColor: '#FF5B5B', padding: '10px', borderRadius:'25px'}}>
        <a href={'http://localhost:3000/'} style={{color: 'black', textDecoration: 'none'}}>Log Out</a>
    </button>





    </div>

  );
}