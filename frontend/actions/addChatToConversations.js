export const addChatToConversations = (id, username, key) => {
  return {
    type: 'ADD_CHAT_TO_CONVERSATIONS',
    conversation_id: id,
    user: username,
    key: key,
  };
};