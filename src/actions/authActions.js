export const setUser = (user) => {
    return {
      type: 'auth/setUser',
      payload: user,
    };
  };
  
  export const clearUser = () => {
    return {
      type: 'auth/clearUser',
    };
  };
  
  export const setToken = (token) => {
    return {
      type: 'auth/login',
      payload: { token }, // Adjust the payload structure
    };
  };
  