export const retrieveFriends = (friends) => {
  return {
    type: 'RETRIEVE_FRIENDS',
    friends: friends,
  }
}