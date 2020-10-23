export const friendQuery = (query) => {
  return {
    type: 'UPDATE_FRIEND_QUERY',
    friendQuery: query,
  };
};