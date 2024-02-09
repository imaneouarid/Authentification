// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  // Add other reducers here if needed
});

export default rootReducer;
