// css
import styles from './FriendRequest.module.css';

export default function FriendRequest(props) {
  const acceptFriendRequest = () => {
    const url = 'http://localhost:5000/update-friend-request';
    fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: {
        request_id: props.requestId,
      },
    })
    .then(res => {

    })
  }

  const declineFriendRequest = () => {

  }

  return (
    <div className={styles.container}>
      <h3>{'@' + props.sender}</h3>
      <div className={styles.buttons}>
        <button onClick={() => acceptFriendRequest()}>Accept</button>
        <button onClick={() => declineFriendRequest()}>Decline</button>
      </div>
    </div>
  );
}