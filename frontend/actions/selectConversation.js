export const selectConversation = (username, id) => {
  return {
    type: 'SELECT_CONVERSATION',
    conversation_id: id,
    user: username,
  };
};