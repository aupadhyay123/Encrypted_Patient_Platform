// redux
import { connect } from 'react-redux';
import { selectConversation } from '../../actions/selectConversation';
import { setMessages } from '../../actions/setMessages';

// css
import styles from './MessageListItem.module.css';

function MessageListItem(props) {
  const handleConversationSelect = async () => {
    props.selectConversation(props.id, props.username, props.secret_key);

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
      var messages_result = [];
      var messages = results.results;

      for(var i = 0; i < messages.length; i++) {
        var msg = {};
        if(messages[i][2] === props.user) {
          msg.type = 0;
        }
        else {
          msg.type = 1;
        }
        msg.text = messages[i][3];
      
        messages_result.push(msg);
      }
      console.log('messages', messages_result);

      props.setMessages(messages_result);
    })
  };

  return (
    <div className={styles.container} onClick={() => handleConversationSelect()}>
      <h2>{props.username}</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const dispatchStateToProps = (dispatch) => ({
  selectConversation: (id, username, key) => dispatch(selectConversation(id, username, key)),
  setMessages: (messages) => dispatch(setMessages(messages)),
});

export default connect(mapStateToProps, dispatchStateToProps)(MessageListItem);