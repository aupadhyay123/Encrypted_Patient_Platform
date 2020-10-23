const initialState = [];

const friends = (state = initialState, action) => {
  switch(action.type) {
    case 'RETRIEVE_FRIENDS':
      return {
        ...state,
        friends: action.friends,
      }
    default:
      return state;
  }
};

export default friends;