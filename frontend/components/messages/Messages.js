// components
import MessageList from './MessageList';
import Conversation from './Conversation';
import FriendSearchModal from './FriendSearchModal';

// redux
import { connect } from 'react-redux';

// css
import nextStyles from './Messages.module.css';

// react
import { useState } from 'react';

function Messages(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className={nextStyles.container}>
      <div className={nextStyles.list}>
        <div className={nextStyles.addContainer}>
          <div className={nextStyles.addButton} onClick={handleToggle}>
            <img src={'/images/icons/plus.png'} />
          </div>
          { modalOpen ? <FriendSearchModal toggle={() => handleToggle()} /> : null }
        </div>
        <MessageList />
      </div>
      <Conversation />
    </div>
  );
}

const mapStateToProps = (state) => ({
  friends: state.friends.friends,
});

export default connect(mapStateToProps)(Messages);