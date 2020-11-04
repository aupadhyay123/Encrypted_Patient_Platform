const initialState = {
  selectedConversation: '',
};

const conversation = (state = initialState, action) => {
  switch(action.type) {
    case 'SELECT_CONVERSATION':
      return {
        ...state,
        selectedConversation: action.user,
      };

    default:
      return state;
  }
};

export default conversation;