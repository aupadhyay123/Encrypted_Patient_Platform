export const updateMessages = (messages) => {
  return {
    type: 'UPDATE_MESSAGES',
    messages: messages,
  };
};