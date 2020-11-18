const initialState = {
  selectedConversation: null,
  conversations: [],
};

const conversations = (state = initialState, action) => {
  switch(action.type) {
    case 'SELECT_CONVERSATION':
      return {
        ...state,
        selectedConversation: {
          conversation_id: action.conversation_id,
          user: action.user,
        },
      };
    case 'ADD_CHAT_TO_CONVERSATIONS':
      return {
        ...state,
        conversations: [{conversation_id: action.conversation_id, user: action.user}, ...state.conversations]
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        conversations: [],
      };
    default:
      return state;
  }
};

export default conversations;