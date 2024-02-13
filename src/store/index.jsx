// store/index.js
// store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import userReducer from '../reducers/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '../reducers';
// import authReducer from './reducers/authSlice';
// import userReducer from './reducers/userSlice';


// const rootReducer = combineReducers({
//     auth: authReducer,
//     user: userReducer,
//   });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;


