// redux
import { connect } from 'react-redux';
import { selectConversation } from '../../actions/selectConversation';

// css
import styles from './MessageListItem.module.css';

function MessageListItem(props) {
  return (
    <div className={styles.container} onClick={() => props.selectConversation(props.username)}>
      <h2>{props.username}</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedConversation: state.conversations.selectedConversation,
});

const dispatchStateToProps = (dispatch) => ({
  selectConversation: (username) => dispatch(selectConversation(username)),
});

export default connect(mapStateToProps, dispatchStateToProps)(MessageListItem);