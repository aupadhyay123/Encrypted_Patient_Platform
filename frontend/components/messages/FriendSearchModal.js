// redux
import { connect } from 'react-redux';

// css
import styles from './FriendSearchModal.module.css';

function FriendSearchModal(props) {
  const Friends = props.friends.map(friend => (
    <h3 key={friend}>@{friend}</h3>
  ));

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <span className={styles.close} onClick={() => props.toggle()}>
          &times;
        </span>
        <div className={styles.content}>
          <h1>Select a friend!</h1>
          <input autoFocus type='text' placeholder={'Search for friends...'} />
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

export default connect(mapStateToProps)(FriendSearchModal);