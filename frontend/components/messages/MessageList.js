// components
import MessageListItem from './MessageListItem';

// redux
import { connect } from 'react-redux';
import { addChatToConversations } from '../../actions/addChatToConversations';
import { clearMessages } from '../../actions/clearMessages';

// css
import styles from './MessageList.module.css';

// react
import { useEffect } from 'react';

function MessageList(props) {
  useEffect(() => {
    props.clearMessages();
    getConversations();
  }, []);

  const getConversations = async () => {
    // add code to retrieve all past conversations
    var base_url = 'http://127.0.0.1:5000/'
    const params = {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        user: props.user
      }),
      method: "POST"
    }
    await fetch(base_url + 'conversation/getall', params)
    .then(data => {
      return data.json();
    })
    .then(results => {
      var res = results.results;
      
      for(var i = 0; i < res.length; i++) {
        var username = (res[i].user1 === props.user) ? res[i].user2 : res[i].user1;
        var id = res[i].conversation_id;
        var key = Uint8Array.from(res[i].secret_key);

        props.addToConversations(id, username, key);
      }
    })
  };

  const Conversations = props.conversations.map(conversation => (
    <MessageListItem username={conversation.user} id={conversation.conversation_id} secret_key={conversation.key} />
  ));

  return (
    <div className={styles.container}>
      {Conversations}
    </div>
  );
}

const mapStateToProps = (state) => ({
  conversations: state.conversations.conversations,
  user: state.login.user,
});

const dispatchStateToProps = (dispatch) => ({
  addToConversations: (id, username, key) => dispatch(addChatToConversations(id, username, key)),
  clearMessages: () => dispatch(clearMessages()),
});

export default connect(mapStateToProps, dispatchStateToProps)(MessageList);