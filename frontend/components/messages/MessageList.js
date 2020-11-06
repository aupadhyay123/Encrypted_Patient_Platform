// redux
import { connect } from 'react-redux';
import { selectConversation } from '../../actions/selectConversation';

// css
import styles from './MessageList.module.css';

function MessageList(props) {
  const Conversations = props.conversations.map(conversation => (
    <div key={conversation} className={styles.conversation}>
      <h2>{conversation}</h2>
    </div>
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