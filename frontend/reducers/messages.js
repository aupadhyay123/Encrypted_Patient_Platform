const initialState = {
  messages: [],
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, action.messages]
      };
    default:
      return state;
  }
};

export default messages;