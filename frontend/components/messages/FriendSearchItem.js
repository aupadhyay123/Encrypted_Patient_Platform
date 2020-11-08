// redux
import { connect } from 'react-redux';
import { selectConversation } from '../../actions/selectConversation';
import { toggleFriendSearchModal } from '../../actions/toggleFriendSearchModal';
import { addChatToConversations } from '../../actions/addChatToConversations';

// css
import styles from './FriendSearchItem.module.css';

function FriendSearchItem(props) {
  const handleFriendSelect = (username) => {
    if(!props.conversations.includes(username)) {
      props.addChatToConversations(username);
    }

    props.selectConversation(username);
    props.toggleFriendSearchModal();
  };

  return (
    <div key={props.username} className={styles.container} onClick={() => handleFriendSelect(props.username)}>
      <h3>@{props.username}</h3>
    </div>
  );
}

const mapStateToProps = (state) => ({
  conversations: state.conversations.conversations,
});

const dispatchStateToProps = (dispatch) => ({
  selectConversation: (username) => dispatch(selectConversation(username)),
  toggleFriendSearchModal: () => dispatch(toggleFriendSearchModal()),
  addChatToConversations: (username) => dispatch(addChatToConversations(username))
});

export default connect(mapStateToProps, dispatchStateToProps)(FriendSearchItem);