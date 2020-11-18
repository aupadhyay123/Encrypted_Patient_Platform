// redux
import { connect } from 'react-redux';
import { selectConversation } from '../../actions/selectConversation';
import { updateMessages } from '../../actions/updateMessages';

// css
import styles from './MessageListItem.module.css';

function MessageListItem(props) {
  const handleConversationSelect = async () => {
    props.selectConversation(props.id, props.username);

    var base_url = 'http://127.0.0.1:5000/'
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        conversation_id: props.id,
      }),
      method: "POST"
    };

    await fetch(base_url + 'messages/all', params)
    .then(data => {
      return data.json();
    })
    .then(results => {
      var messages = results.results;
      console.log('messages', messages);
    })
  };

  return (
    <div className={styles.container} onClick={() => handleConversationSelect()}>
      <h2>{props.username}</h2>
    </div>
  );
}

const dispatchStateToProps = (dispatch) => ({
  selectConversation: (id, username) => dispatch(selectConversation(id, username)),
  updateMessages: (messages) => dispatch(updateMessages(messages)),
});

export default connect(null, dispatchStateToProps)(MessageListItem);