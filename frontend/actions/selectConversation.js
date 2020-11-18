export const selectConversation = (id, username) => {
  return {
    type: 'SELECT_CONVERSATION',
    conversation_id: id,
    user: username,
  };
};