const initialState = {
  friendResults: []
};

const friendResults = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_FRIEND_RESULTS':
      return {
        ...state,
        friendResults: action.friendResults
      };
    default:
      return state;
  }
};

export default friendResults;