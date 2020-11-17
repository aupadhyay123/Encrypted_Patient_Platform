const initialState = {
  friendSearchModalOpen: false,
};

const friendSearchModal = (state = initialState, action) => {
  switch(action.type) {
    case 'TOGGLE_FRIEND_SEARCH_MODAL':
      return {
        ...state,
        friendSearchModalOpen: !state.friendSearchModalOpen,
      };
    default:
      return state;
  }
};

export default friendSearchModal;