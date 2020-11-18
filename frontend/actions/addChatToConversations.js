export const addChatToConversations = (id, username) => {
  return {
    type: 'ADD_CHAT_TO_CONVERSATIONS',
    conversation_id: id,
    user: username,
  };
};