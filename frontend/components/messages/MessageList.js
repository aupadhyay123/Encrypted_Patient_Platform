// components
import MessageListItem from './MessageListItem';

// redux
import { connect } from 'react-redux';
import { selectConversation } from '../../actions/selectConversation';

// css
import styles from './MessageList.module.css';

function MessageList(props) {
  const Conversations = props.conversations.map(conversation => (
    <MessageListItem username={conversation} />
  ));

  return (
    <div className={styles.container}>
      {Conversations}
    </div>
  );
}

const mapStateToProps = (state) => ({
  conversations: state.conversations.conversations,
});

const dispatchStateToProps = (dispatch) => ({
  selectConversation: (username) => dispatch(selectConversation(username)),
});

export default connect(mapStateToProps)(MessageList);