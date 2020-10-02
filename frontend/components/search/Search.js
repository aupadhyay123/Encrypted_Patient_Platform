// css
import styles from './Search.module.css';

export default function Search(props) {
  return (
    <div>

        <div className={styles.search}>
            <input type={'text'} placeholder={'Search...'} style={{position: 'relative', width: '60%', height: '20px', borderRadius: '20px'}}/>
            <input type={'submit'} value={'Search'} style={{position: 'relative', left: '5%', width: '10%', height: '25px'}}/>
        </div>

    </div>

  );
}