// actions/authActions.js
export const setUser = (user) => {
    return {
      type: 'SET_USER',
      payload: user,
    };
  };
  
  export const clearUser = () => {
    return {
      type: 'CLEAR_USER',
    };
  };
  
export const setToken = (token) => {
    return {
      type: 'SET_TOKEN',
      payload: token,
    };
  };