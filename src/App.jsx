
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Register from '../src/pages/register'; // Correctly capitalize the component name
import Login from '../src/pages/login'; // Correctly capitalize the component name
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/UserList" element={<UserList userRoles={['admin']} />} />
          <Route path="/profile" element={<ProfilePage />} />


        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
