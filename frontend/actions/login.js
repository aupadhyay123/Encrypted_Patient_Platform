export const login = (username) => {
  return {
    type: 'LOGIN',
    user: username,
  };
};