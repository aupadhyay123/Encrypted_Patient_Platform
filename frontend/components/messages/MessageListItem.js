// redux
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectConversation } from '../../actions/selectConversation';

// css
import styles from './MessageListItem.module.css';

function MessageListItem(props) {
  useEffect(() => {
    console.log('id', props.id);
    console.log('username', props.username);
  }, [])
  return (
    <div className={styles.container} onClick={() => props.selectConversation(props.id, props.username)}>
      <h2>{props.username}</h2>
    </div>
  );
}

const dispatchStateToProps = (dispatch) => ({
  selectConversation: (id, username) => dispatch(selectConversation(id, username)),
});

export default connect(null, dispatchStateToProps)(MessageListItem);