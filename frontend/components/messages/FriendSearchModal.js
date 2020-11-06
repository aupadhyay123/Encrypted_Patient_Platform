// redux
import { connect } from 'react-redux';
import { toggleFriendSearchModal } from '../../actions/toggleFriendSearchModal';

// react
import { useState } from 'react';

// components
import FriendSearchItem from './FriendSearchItem';

// css
import styles from './FriendSearchModal.module.css';

function FriendSearchModal(props) {
  const Friends = props.friends.map(friend => (
    <FriendSearchItem username={friend} />
  ));

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <span className={styles.close} onClick={() => props.toggleFriendSearchModal()}>
          &times;
        </span>
        <div className={styles.content}>
          <h1>Select a friend!</h1>
          <input type='text' placeholder={'Search for friends...'} />
          <div className={styles.friends}>
            {Friends}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  friends: state.friends.friends,
});

const dispatchStateToProps = (dispatch) => ({
  toggleFriendSearchModal: () => dispatch(toggleFriendSearchModal()),
});

export default connect(mapStateToProps, dispatchStateToProps)(FriendSearchModal);