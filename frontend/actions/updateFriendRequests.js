export const updateFriendRequests = (friendRequests) => {
  return {
    type: 'UPDATE_FRIEND_REQUESTS',
    friendRequests: friendRequests,
  }
}