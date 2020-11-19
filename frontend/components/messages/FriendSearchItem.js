// redux
import { connect } from 'react-redux';
import { selectConversation } from '../../actions/selectConversation';
import { toggleFriendSearchModal } from '../../actions/toggleFriendSearchModal';
import { addChatToConversations } from '../../actions/addChatToConversations';

// css
import styles from './FriendSearchItem.module.css';

import {generate_key_nonce, encrypt_message, decrypt_message} from "../../encryption/Encryption";

function FriendSearchItem(props) {
  const handleFriendSelect = async (username) => {
    var conversation_exists = false;
    for(var i = 0; i < props.conversations.length; i++) {
      if (props.conversations[i].user === username) {
        conversation_exists = true;
        break;
      }
    }
   
    if (conversation_exists) {
      props.selectConversation(props.conversations[i].conversation_id, username);
    }
    else {
      var base_url = 'http://127.0.0.1:5000/'
      var key_nonce = generate_key_nonce()
      var key = key_nonce['key']
      const create_params = {
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({user1: props.user, user2: username, secret_key: key}),
        method: "POST"
      }

      var conversation_id;
      await fetch(base_url+'conversation', create_params)
      .then(data => {return data.json()})
      .then(res => {
        var box = res.results
        console.log(box)
        conversation_id = box['conversation_id']
      })

      props.addChatToConversations(conversation_id, username, key);
      props.selectConversation(conversation_id, username, key);
    }
    
    props.toggleFriendSearchModal();
  };

  return (
    <div key={props.username} className={styles.container} onClick={() => handleFriendSelect(props.username)}>
      <h3>@{props.username}</h3>
    </div>
  );
}

const mapStateToProps = (state) => ({
  conversations: state.conversations.conversations,
  user: state.login.user,
});

const dispatchStateToProps = (dispatch) => ({
  selectConversation: (id, username, key) => dispatch(selectConversation(id, username, key)),
  toggleFriendSearchModal: () => dispatch(toggleFriendSearchModal()),
  addChatToConversations: (id, username, key) => dispatch(addChatToConversations(id, username, key))
});

export default connect(mapStateToProps, dispatchStateToProps)(FriendSearchItem);