// css
import styles from './Profile.module.css';

// next.js
import { useRouter } from 'next/router';

// react.js
import { useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { updateFriends } from '../../actions/updateFriends';
import { updateFriendRequests } from '../../actions/updateFriendRequests';

// components
import FriendRequest from './FriendRequest';

function Profile(props) {
  useEffect(() => {
    getFriends();
    getFriendRequests();
  }, [])

  const getFriends = () => {
    const url = 'http://localhost:5000/friends';

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user: props.user,
      }),
    })
    .then(res => {
      return res.json();
    })
    .then(({ friends }) => {
      console.log('friends', friends);
      props.updateFriends(friends);
    })
  };

  const getFriendRequests = () => {
    const url = 'http://localhost:5000/friend-requests';

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user: props.user,
      }),
    })
    .then(res => {
      return res.json();
    })
    .then(({ friend_requests }) => {
      console.log('friend requests', friend_requests);
      props.updateFriendRequests(friend_requests);
    })
  };

  const Friends = props.friends.map(friend => (
    <div key={friend}>
      <h3>{friend}</h3>
    </div>
  ));

  const FriendRequests = props.friendRequests.map(friendRequest => (
    <FriendRequest sender={friendRequest.sender} requestId={friendRequest.id} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.profilePic}>
          <img src={'/images/ProfilePic.png'} />
        </div>
        <div className={styles.info}>
          <h1>{'@' + props.user}</h1>
        </div>
      </div>
      <div className={styles.connections}>
        <div className={styles.friends}>
          <h1>Friends</h1>
          {Friends}
        </div>
        <div className={styles.friendRequests}>
          <h1>Friend Requests</h1>
          {FriendRequests}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.login.user,
  friends: state.friends.friends,
  friendRequests: state.friendRequests.friendRequests,
});

const dispatchStateToProps = (dispatch) => ({
  updateFriends: (friends) => dispatch(updateFriends(friends)),
  updateFriendRequests: (friendRequests) => dispatch(updateFriendRequests(friendRequests)),
});

export default connect(mapStateToProps, dispatchStateToProps)(Profile);