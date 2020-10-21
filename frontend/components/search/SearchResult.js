// css
import styles from './SearchResult.module.css';

// next.js
import { useRouter } from 'next/router';

export default function SearchResult(props) {
  const router = useRouter();
  const { user } = router.query;

  const handleFriendRequest = () => {
    const url = 'http://localhost:5000/friend-request';
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: user,
        receiver: props.username,
      })
    })
    .then(res => {
      console.log(res);
      if(res.status === 200) {
        
      }
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>{props.firstName + ' ' + props.lastName}</h1>
        <h3>{'@' + props.username}</h3>
      </div>
      <div className={styles.add} onClick={handleFriendRequest}>
        <img src={'/images/icons/plus.png'} />
      </div>
    </div>
  );
}