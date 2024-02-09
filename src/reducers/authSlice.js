import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    roles: [],
    // Other authentication-related state...
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    // Other authentication-related reducers...
    deleteUser: (state, action) => {
      // Implement logic to update state after deleting a user
      // You may filter out the deleted user from the state
    },
  },
});

export const { setUser, setRoles, deleteUser } = authSlice.actions;

export default authSlice.reducer;

