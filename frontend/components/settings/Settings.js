// css
import styles from './Settings.module.css';

export default function Settings(props) {
  return (
    <div className={styles.container}>

      <h5 style={{position: 'relative', width: '80%', left: '10%', fontSize: '40px', textAlign: 'center', backgroundColor: 'lightgray', padding: '10px'}}><a href={'../'} style={{color: 'white', textDecoration: 'none'}}>Notifications</a></h5>
      <h5 style={{position: 'relative', width: '80%', left: '10%', fontSize: '40px', textAlign: 'center', backgroundColor: 'lightgray', padding: '10px'}}><a href={'../'} style={{color: 'white', textDecoration: 'none'}}>Privacy</a></h5>
      <h5 style={{position: 'relative', width: '80%', left: '10%', fontSize: '40px', textAlign: 'center', backgroundColor: 'lightgray', padding: '10px'}}><a href={'../'} style={{color: 'white', textDecoration: 'none'}}>Security</a></h5>
      <h5 style={{position: 'relative', width: '80%', left: '10%', fontSize: '40px', textAlign: 'center', backgroundColor: 'lightgray', padding: '10px'}}><a href={'../'} style={{color: 'white', textDecoration: 'none'}}>Help</a></h5>
      <h5 style={{position: 'relative', width: '80%', left: '10%', fontSize: '40px', textAlign: 'center', backgroundColor: 'lightgray', padding: '10px'}}><a href={'../'} style={{color: 'white', textDecoration: 'none'}}>About</a></h5>
      <h5 style={{position: 'relative', width: '80%', left: '10%', fontSize: '40px', textAlign: 'center', backgroundColor: 'lightgray', padding: '10px'}}><a href={'../'} style={{color: 'red', textDecoration: 'none'}}>Log Out</a></h5>





    </div>

  );
}