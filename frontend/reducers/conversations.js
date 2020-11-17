const initialState = {
  selectedConversation: '',
  conversations: [],
};

const conversations = (state = initialState, action) => {
  switch(action.type) {
    case 'SELECT_CONVERSATION':
      return {
        ...state,
        selectedConversation: action.user,
      };
    case 'ADD_CHAT_TO_CONVERSATIONS':
      return {
        ...state,
        conversations: [action.user, ...state.conversations]
      };
    default:
      return state;
  }
};

export default conversations;