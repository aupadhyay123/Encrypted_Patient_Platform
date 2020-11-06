export const addChatToConversations = (username) => {
  return {
    type: 'ADD_CHAT_TO_CONVERSATIONS',
    user: username,
  };
};