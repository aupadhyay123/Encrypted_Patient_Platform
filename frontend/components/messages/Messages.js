// components
import MessageList from './MessageList';
import Conversation from './Conversation';
import FriendSearchModal from './FriendSearchModal';

// redux
import { connect } from 'react-redux';
import { toggleFriendSearchModal } from '../../actions/toggleFriendSearchModal';

// css
import nextStyles from './Messages.module.css';

function Messages(props) {
  return (
    <div className={nextStyles.container}>
      <div className={nextStyles.list}>
        <div className={nextStyles.addContainer}>
          <div className={nextStyles.addButton} onClick={() => props.toggleFriendSearchModal()}>
            <img src={'/images/icons/plus.png'} />
          </div>
          { props.friendSearchModalOpen ? <FriendSearchModal /> : null }
        </div>
        <MessageList />
      </div>
      <Conversation />
    </div>
  );
}

const mapStateToProps = (state) => ({
  friends: state.friends.friends,
  friendSearchModalOpen: state.friendSearchModal.friendSearchModalOpen,
});

const dispatchStateToProps = (dispatch) => ({
  toggleFriendSearchModal: () => dispatch(toggleFriendSearchModal()),
});

export default connect(mapStateToProps, dispatchStateToProps)(Messages);