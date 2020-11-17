export const selectConversation = (username) => {
  return {
    type: 'SELECT_CONVERSATION',
    user: username,
  };
};