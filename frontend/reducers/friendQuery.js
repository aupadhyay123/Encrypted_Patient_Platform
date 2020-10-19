const initialState = {
  friendQuery: '',
};

const friendQuery = (state=initialState, action) => {
  switch(action.type) {
    case 'UPDATE_FRIEND_QUERY':
      return {
        ...state,
        friendQuery: action.friendQuery
      };
    default:
      return state;
  }
}

export default friendQuery;