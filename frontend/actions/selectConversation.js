export const selectConversation = (id, username, key) => {
  return {
    type: 'SELECT_CONVERSATION',
    conversation_id: id,
    user: username,
    key: key,
  };
};