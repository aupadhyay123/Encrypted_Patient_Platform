// components
import MessageListItem from './MessageListItem';

// redux
import { connect } from 'react-redux';
import { addChatToConversations } from '../../actions/addChatToConversations';

// css
import styles from './MessageList.module.css';

// react
import { useEffect } from 'react';

function MessageList(props) {
  useEffect(() => {
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
        
        props.addToConversations(id, username);
      }
    })
  };

  const Conversations = props.conversations.map(conversation => (
    <MessageListItem username={conversation.user} id={conversation.conversation_id} />
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
  addToConversations: (id, username) => dispatch(addChatToConversations(id, username)),
});

export default connect(mapStateToProps, dispatchStateToProps)(MessageList);