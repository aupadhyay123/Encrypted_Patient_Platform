// css
import styles from './FriendRequest.module.css';

// redux
import { connect } from 'react-redux';

// react
import { useEffect } from 'react';

const url = 'http://localhost:5000/validate-friend-request';

function FriendRequest(props) {
  useEffect(() => {
    console.log('request_id', props.requestId);
  })
  const acceptFriendRequest = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        request_id: props.requestId,
        accept: true,
        sender: props.sender,
        receiver: props.user,
      }),
    })
    .then(res => {
      console.log(res);
    })
  }

  const declineFriendRequest = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        request_id: props.requestId,
        accept: false,
        sender: props.sender,
        receiver: props.user,
      }),
    })
    .then(res => {
      console.log(res);
    })
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

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps)(FriendRequest);