const initialState = {
  friendRequests: [],
};

const friendRequests = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_FRIEND_REQUESTS':
      return {
        ...state,
        friendRequests: action.friendRequests,
      };
    default:
      return state;
  }
};

export default friendRequests;